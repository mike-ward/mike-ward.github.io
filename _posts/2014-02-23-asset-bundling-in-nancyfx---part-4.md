---
layout: post
title: 'Asset Bundling in NancyFx - Part 4'
---
Shortly, after I posted the first 3 parts of this article, [Andreas Håkansson](http://thecodejunkie.com/) (a.k.a [@TheCodeJunkie](https://twitter.com/TheCodeJunkie) and one of the creators of [NancyFx](http://nancyfx.org)), contacted me to suggest I implement my asset bundler as a static content provider.

Related:

  * [Script Bundling in NancyFx](/2014/02/19/script-bundling-in-nancyfx)
  * [Asset Bundling in NancFx - Part 2](/2014/02/20/asset-bundling-in-nancyfx-ndash-part-2)
  * [Asset Bundling in NancFx - Part 3](/2014/02/21/asset-bundling-in-nancyfx---part-3)
  * [Asset Bundling in NancFx - Part 4](/2014/02/23/asset-bundling-in-nancyfx---part-4)

Duh! I should have thought of that. I guess I was thinking that because it was assembling files, it wasn't "static content". Andreas suggested implementing it as a `StaticContentProvider`. I couldn't puzzle out just how to do this so I mimicked the [convention used to map folders and files](https://github.com/NancyFx/Nancy/wiki/Managing-static-content) as static content. 

To add bundles, override the `ConfigureConventions` method in the `bootstrapper` as follows:
    
    protected override void ConfigureConventions(NancyConventions nancyConventions)
    {
        base.ConfigureConventions(nancyConventions);
    
        nancyConventions.StaticContentsConventions.AddStylesBundle("styles",
            new[]
            {
                "css/pure-min.css",
                "css/styles.css"
            });
    
        nancyConventions.StaticContentsConventions.AddScriptsBundle("scripts",
            new[]
            {
                "js/third-party/angular.min.js",
                "js/app/app.js"
            });
    }
    

The first argument is the requested path so head of the HTML page looks like:
    
    <head>
        <meta name="viewport" content="width=device-width">
        <link rel="stylesheet" href="~/styles">
        <script src="~/scripts"></script>
    <head>

The code changes in that a `StaticContentBundleConventionBuilder` is added to build help integrate the bundling logic into the Nancy's static content conventions and some syntactic sugar in the form of extension methods.

Here's the code:
    
    using System;
    using System.Collections.Concurrent;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Text;
    using Nancy;
    using Nancy.Helpers;
    using Nancy.Responses;
    
    namespace SendExplorer.Utilities
    {
        public static class StaticContentBundle
        {
            private static readonly ConcurrentDictionary<int, AssetBundle> BundleCache = 
                new ConcurrentDictionary<int, AssetBundle>();
    
            public static Response ResponseFactory(IEnumerable<string> files, string contentType, 
                NancyContext context, string applicationRootPath)
            {
                var paths = files.Select(file => Path.Combine(applicationRootPath, file));
                var hash = BundleHash(paths);
    
                if (BundleCache.ContainsKey(hash) == false)
                {
                    var assetBundle = new AssetBundle
                    {
                        ETag = Convert.ToString(hash),
                        LastUpdate = paths.Max(p => new FileInfo(p).LastAccessTimeUtc), 
                        Bytes = Encoding.UTF8.GetBytes(
                            string.Join(Environment.NewLine, paths.Select(File.ReadAllText)))
                    };                
                    BundleCache.TryAdd(hash, assetBundle);
                }
    
                var bundle = BundleCache[hash];
    
                return (CacheHelpers.ReturnNotModified(bundle.ETag, bundle.LastUpdate, context))
                    ? ResponseNotModified()
                    : ResponseFromBundle(bundle, contentType);
            }
    
            private static int BundleHash(IEnumerable<string> files)
            {
                return files
                    .Select(f => new FileInfo(f).LastWriteTimeUtc.GetHashCode() ^ f.GetHashCode())
                    .Aggregate((h1, h2) => h1 ^ h2);
            }
    
            private static Response ResponseNotModified()
            {
                return new Response
                {
                    StatusCode = HttpStatusCode.NotModified,
                    ContentType = null,
                    Contents = Response.NoBody
                };
            }
    
            private static Response ResponseFromBundle(AssetBundle assetBundle, string contentType)
            {
                var stream = new MemoryStream(assetBundle.Bytes);
                var response = new StreamResponse(() => stream, contentType);
                response.Headers["ETag"] = assetBundle.ETag;
                response.Headers["Last-Modified"] = assetBundle.LastUpdate.ToString("R");
                return response;
            }
    
            private class AssetBundle
            {
                public DateTime LastUpdate { get; set; }
                public string ETag { get; set; }
                public byte[] Bytes { get; set; }
            }
        }
    
        public static class StaticContentBundleConventionBuilder
        {
            public static Func<NancyContext, string, Response> AddBundle(string requestedFile, 
                string contentType, IEnumerable<string> files)
            {
                if (requestedFile.StartsWith("/") == false) 
                    requestedFile = string.Concat("/", requestedFile);
    
                return (context, applicationRootPath) =>
                {
                    var path = context.Request.Path;
                    if (path.Equals(requestedFile, StringComparison.OrdinalIgnoreCase) == false)
                    {
                        context.Trace.TraceLog.WriteLog(x => x.AppendLine(
                            string.Concat(
                                "[BundleStaticContentConventionBuilder] The requested resource '",
                                path, "' does not match convention mapped to '", requestedFile, "'")));
                        return null;
                    }
    
                    return StaticContentBundle.ResponseFactory(files, contentType, context, 
                        applicationRootPath);
                };
            }
        }
    
        public static class StaticContentBundleConventionsExtensions
        {
            public static void AddStylesBundle(this IList<Func<NancyContext, string, Response>> 
                conventions, string requestedPath, IEnumerable<string> files)
            {
                conventions.AddBundle(requestedPath, "text/css", files);
            }
    
            public static void AddScriptsBundle(this IList<Func<NancyContext, string, Response>> 
                conventions, string requestedPath, IEnumerable<string> files)
            {
                conventions.AddBundle(requestedPath, "application/x-javascript", files);
            }
    
            public static void AddBundle(this IList<Func<NancyContext, string, Response>> conventions, 
                string requestedPath, string contentType, IEnumerable<string> files)
            {
                conventions.Add(StaticContentBundleConventionBuilder
                    .AddBundle(requestedPath, contentType, files));
            }
        }
    }

[https://gist.github.com/mike-ward/9172463](https://gist.github.com/mike-ward/9172463)

### Some final thoughts

Originally, I started down this path because I couldn't get Microsoft's Asset Bundler or [SquishIt](https://github.com/NancyFx/Nancy/wiki/SquishIt-with-Nancy) to work with the latest version of NancyFx (0.22.2). I've since found out an updated version of SquishIt is in the works to address the compatibility issues with NancyFx.

There's also a package called [Nancy.Cassette](https://github.com/ChrisMH/Cassette.Nancy). This one slipped by me. because I didn't associate the name, "Cassette" with asset bundling. [Cassette](http://getcassette.net/) has features that make it worth consideration, especially on larger, more complex projects. One feature I find intriguing is that assets can be ordered by embedding, "@reference" tags in the resource. It's a bit like [RequireJS](http://requirejs.org/) in that loading is ordered by resolving the given dependencies. It also has plugins for LESS, SASS, Coffee and other toolkits.

And so ends my little experiment in asset bundling. For small projects, my asset bundler is just what I want. It's a single file at just over 100 lines of code making it easy to integrate. And when I need more features, there's always Cassette and SquishIt. My asset bundler may not be the end-all, be-all solution, but I learned a lot doing it and at the end of the day, that's enough for me. 

### Update 3/6/2014

A commenter asked for CSS and JS minification. I hacked together a quick implementation using sources I found on the Internet. The JS minifier is simplistic and will not perform to the same level as other JavaScript minifiers. On the other hand, the entire bundle/minify package fits in one 150 line file.

[https://gist.github.com/mike-ward/9392480](https://gist.github.com/mike-ward/9392480)
