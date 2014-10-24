---
layout: post
title: 'Easy .NET Performance Hack'
---
<span style="float: right">![noborder](/cdn/images/blog/2014-10-20-easy-net-performance-hack/works-on-my-machine.png "Your mileage may vary")</span>

As of late, my laptop has been slow to start applications. I did the usual disk cleaning, cache flushes, etc., all of which had little affect on performance. Then I came across [this Stack Overflow Article](http://stackoverflow.com/questions/2947118/wpf-slow-to-start-on-x64-in-net-framework-4-0). To quote one of the comments:

> "Holy $%@&, it WORKED!!!"

Here's the the hack.

    CD C:\Windows\Microsoft.NET\Framework64\v4.0.30319
    NGEN update

It takes a few minutes to run and you'll see lots of errors, which you can safely ignore. I did the same on the 32-bit version of the framework. I plan to run this after every system update.

It's a bit of a disappointment to have to perform maintenance tasks on the framework.