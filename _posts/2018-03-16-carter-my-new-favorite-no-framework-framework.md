---
layout: post  
title: "Carter, My New Favorite No-Framework Framework"
published: false
...

Readers of this blog know I'm a long time fan of NancyFx. NancyFx makes writing Web backends fun in comparison to ASP.NET and many other technologies. Times change and with the release of ASP.NET Core 2.2 and its performance and portability improvements its time to reexamine.

Disappointingly, ASP.NET Core still uses attribute routing, convention routing, ASP.Net Controllers or `IRouteBuilder` extensions. One of the reasons I use Nancy is it has a straightforward, just works approach to routing. If only I could get all the new goodness of ASP.NET Core with Nancy like routing. Enter Carter.

Carter is a library that allows Nancy like routing for use with ASP.Net Core. It's not a framework but instead builds on top  Microsoft.AspNetCore.Routing.

Is an example in MVC followed by Carter.

```
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;

namespace App.Controllers
{
  [ApiController]
  [Route("api/[controller]/[action]")]
  public class MarketsController : ControllerBase
  {
    public ActionResult News() => Get("https://api.iextrading.com/1.0/stock/aapl/news");

    [ActionName("most-active")]
    public ActionResult MostActive() => Api("https://api.iextrading.com/1.0/stock/market/list/mostactive");

    public ActionResult Gainers() => Api("https://api.iextrading.com/1.0/stock/market/list/gainers");

    public ActionResult Losers() => Api("https://api.iextrading.com/1.0/stock/market/list/losers");

    public ActionResult Symbols() => Api("https://api.iextrading.com/1.0/ref-data/symbols");

    private static ContentResult Api(string url)
    {
      var client = HttpClientFactory.Create();
      var data = client.DownloadString(new Uri(url));
      if (data is null) throw new InvalidProgramException("oops");
      return new ContentResult { Content = data, ContentType = "application/json" };
    }
  }
}
```
 And with Carter
```
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Carter;
using Microsoft.AspNetCore.Http;

namespace App.Modules
{
    public class MarketsModule : CarterModule
    {
        public MarketsModule() : base("api/markets")
        {
            Get("news", async (ctx) => await Api(ctx, "https://api.iextrading.com/1.0/stock/aapl/news"));

            Get("most-active", async (ctx) => await Api(ctx, "https://api.iextrading.com/1.0/stock/market/list/mostactive"));

            Get("gainers", async (ctx) => await Api(ctx, "https://api.iextrading.com/1.0/stock/market/list/gainers"));

            Get("losers", async (ctx) => await Api(ctx, "https://api.iextrading.com/1.0/stock/market/list/losers"));

            Get("symbols", async (ctx) => await Api(ctx, "https://api.iextrading.com/1.0/ref-data/symbols"));
        }

        private static async Task Api(HttpContext ctx, string url)
        {
            var client = HttpClientFactory.Create();
            var data = await client.GetStringAsync(new Uri(url));
            if (data is null) throw new InvalidProgramException("oops");
            ctx.Response.ContentType = "application/json";
            await ctx.Response.WriteAsync(data);
        }
    }
}
```

I
