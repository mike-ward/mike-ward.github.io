---
layout: post  
title: "Resolving Virtual Paths to Uri's in ASP.Net"
---
ASP.Net has a boat load of methods for dealing with paths. However, no where can I find a method to convert a virtual path (~/) to its equivalent Uri. Perhaps it’s there but darn if I can find it. The best I can up with is:
    
    var uri = Request.Url.GetLeftPart(UriPartial.Authority) + ResolveUrl("~/SomePage.aspx")

If the site is hosted at: [http://example.com/website](http://example.com/website), then this code yields [http://example.com/website/SomePage.aspx](http://example.com/website/SomePage.aspx), which is what I want. 

Perhaps there is a better way to do this?
