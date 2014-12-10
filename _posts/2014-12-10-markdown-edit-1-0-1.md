---
layout: post  
title: Markdown Edit 1.0.1
---
### One big change and a couple of smaller ones.

- Switched to using a standard Windows installer (.msi). This has some long term benefits and plays better in corporate environments. The downside is that you'll have to manually uninstall the 1.0 version which used a different installer technology. Sorry for the inconvenience. The good news (sort of) is not many of you downloaded 1.0.
- Added an **Insert File** command (`Ctrl+Shift+O`). I was toying with adding template documents but concluded inserting a file was more flexible.
- Upgraded to [MahApps.Metro 1.0](http://mahapps.com/). This is the UI library that gives Markdown Edit its *modern* look.

I'm still waiting on my [Chocolatey](http://chocolatey.org) submission. I expect it to go live in the next couple of days.

### Road Map

- Convert HTML to Markdown - This will allow insert/drag-drop an HTML file into the editor.
- Recent files shortcuts - Add shortcuts (1..0,a..j) to the "Recent Files" dialog.
- Review documents - A way to quickly review a directory of markdown files.
- Multiple files - It won't use tabs. Something more keyboard centric.
- Format tables - If/when CommonMark adopts table markdown, I'll add a helper to quickly define tables.

I would really like to add a grammar checker to the editor. [Grammarly](https://app.grammarly.com/free) has an API, but only for, "High Volume Customers." I haven't seen anything else in terms of a .NET library or on-line service with API. Ping me if you know of something.

Anything else?

Oh, and don't forget to send me some themes.

Available on the [Downloads Page](http://mike-ward.net/downloads)
