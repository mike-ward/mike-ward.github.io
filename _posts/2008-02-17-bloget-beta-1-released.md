---
layout: post  
title: 'Bloget Beta 1 Released!'
---
It's been like forever since the last release of Bloget back in July of 2007. Don't know what Bloget is? Check out this [link](/bloget) for details. 

It's been 6 months since the last alpha release of Bloget. In that time I've been working steadily to improve Bloget. Perhaps the biggest improvement is that **the source code is now included**. I recently starting using parts of the CruiseControl.NET source code for monitoring other build tasks at work. Something that would not have been possible without the source. And so with that lesson learned I'm extending the same policy to others. In fact, over the coming months, I'll be releasing source for all my creations (insert evil laugh) plus a couple of yet to be announced projects I've been working on (insert second evil laugh).

But enough of that stuff, what's new in Bloget? Besides the aforementioned source code, I've added support for ASP.Net's membership providers. This allows Bloget to participate in a Web site's existing membership framework should one exist. But fear not faithful reader, should you not have or use membership providers, Bloget will supply one for you. The built in XML membership provider works where others won't. Especially on hosted Web services like Godaddy.com where security restrictions can limit you're use of such features.

Bloget also has a data provider interface so it can integrate with data sources like databases. Bloget's default data model uses XML files and requires zero configuration. It's fast, reliable and again works on economy Web hosts services that don't supply database support. Bloget's XML data model is super fast and can support 10's of thousands of blog entries with very little overhead.

It also has to be the easiest blogging engine on the planet to install. It's one 450K binary file. Drop it in your ASP.NET 2.0 web site's Bin folder, add two lines to a web page and you're up and running. It's dead simple, fall of the log easy. But don't let this simplicity fool you into thinking Bloget is wimpy. It supports most of the features you expect from a modern blogging engine like MetaWebLogAPI support, comments, feeds, WYSIWYG editing, templates and more.

As you can see I'm pretty excited about this release. I sincerely believe this is one of the best blogging engines available today (of course I'm a bit biased here). And now that you have the source, you can help make it even better. Your mission, should you decide to accept it, is to download, install it and have a blast using it. And of course sending me bug reports/suggestions/fixes/enhancements and good chocolate is also appreciated.
