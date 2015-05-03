---
layout: post  
title: "Markdown Edit 1.6 - Ready to Translate"
---
[Markdown Edit](http://mike-ward.net/markdownedit) is ready for translations.
The interface and features have stabilized to the point where I can allow
crowd-sourced translations.

To translate, find the program's Languages folder
(`\Users\<user>\AppData\Local\MarkdownEdit\Languages\)`. There you will find a
folder called `en`. This is the source English version. There are two files,
`local.txt` and `help.md`. Both require translations.

`local.txt` contains name value pairs. The first part (left of the colon) is an
identifier - don't change it. The text to the right of colon is what needs to be
translated.

`help.md` is the help file. This file needs to be translated up to the `About`
section. Everything beyond the `About` section is license related and should not
be changed.

You'll need to create a folder under the `Languages` folder. The folder is named
using a two-letter ISO language identifier. Place your translated files in that
folder. Start Markdown Edit and confirm that the text appears as you intend.

You can either send me the translated files by email or create a pull request on
GitHub.

This release includes a few other fixes/features:

-   Editor did not have initial focus on startup
-   Program startup time improvements
-   Installed in local user folder
-   Simplified installer

Moving the program to the user `AppData` folder allows for installation without
having administrative privileges.

While Markdown Edit is not slow to start, I'm always looking for ways to improve
this aspect. The goal, although likely not achievable, is to have Markdown Edit
launch as fast as Notepad.

Available on the [Downloads Page](http://mike-ward.net/downloads).
