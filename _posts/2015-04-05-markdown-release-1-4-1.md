---
layout: post  
title: 'Markdown Edit Release 1.4.1'
---
I've received a couple reports about image uploading not working sometimes. This release adds some extra error checking/reporting to help track down the issue.

Copy and paste has also been enhanced. When pasting text, [Markdown Edit](http://mike-ward.net/markdownedit) will check to see if the text is a well-formed URL. If it is a well-formed link, a Markdown link tag is inserted.

In addition, it will query the link to see if it's an image link. If it's an image link, a Markdown image tag is inserted.

Try it. Drag and drop an image from your browser onto the editor.

Some of the icons on the title bar are not available in Windows 7. This [link](<http://media.askvg.com/downloads/2013/01/Install-Segoe-UI-Symbol-Font-in-Windows-8.zip>) has newer fonts (Use the Windows 8.1 version). No guarantees, but it worked on the one machine I tried.

Available on the [Downloads Page](http://mike-ward.net/downloads).