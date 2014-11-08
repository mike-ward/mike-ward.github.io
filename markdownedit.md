---
layout: page
title: "Markdown Edit"
---

Markdown Edit is  a Windows **desktop** Markdown editor with an emphasis on content and keyboard shortcuts. There is minimal window chrome and most functions are accessed through keyboard shortcuts. There is no main menu, status bar, tabbed windows or other distractions.

> Markdown Edit is currently in Alpha. I welcome your feedback and suggestions. Use the `Comments` button at the bottom of the page.
>
> I need themes! (Dammit Jim!) I'm a programmer, not a designer. Send me some cool themes and I'll include them.

`TL;DR` [Download](http://mike-ward.net/downloads)

Gratuitous Screen Shot  
![screen shot](https://raw.githubusercontent.com/mike-ward/Markdown-Edit/master/ScreenShot.png)

## Features

- Syntax highlighting editor
- Side-by-side HTML preview
- Quickly show/hide preview
- [CommonMark](http://commonmark.org) standard Markdown engine
- User preferences stored in a text file for easy sharing
- Full screen covers task-bar
- Keyboard shortcuts for bold, italic, headers, etc.
- Modern UI look and feel
- **Not** a Windows Store App
- Synchronized scrolling
- User settable fonts, colors, themes
- User defined style sheets
- As you type spell checking
- **Paste Special** replaces Microsoft Word's smart quotes/hyphens/etc. with plain text equivalents
- Quickly open recent files
- Quickly change themes
- [Open Source](https://github.com/mike-ward/Markdown-Edit)
- MIT License

## User Settings

User settings are stored in a text file in the `AppData` folder. Placing settings in a plain file allows sharing of settings on different installations.

Typically, this folder is located at `C:\Users\<USER>\AppData\Roaming\Markdown Edit\user_settings.json`. Pressing `F9` will open this file in the system's Notepad editor. It should look something like this:

When you change settings and save this file, Markdown Edit will immediately update to reflect the changes.

Colors can be defined as RBG values, like the `EditorBackground` setting, or using the predefined names (like the `EditorForground` setting). Acceptable predefined names are listed [here](http://msdn.microsoft.com/en-us/library/system.windows.media.colors(v=vs.110).aspx).

If you delete this file, Markdown Edit will restore it.

## User Template

You can change the appearance of the preview view by changing the user template file. User templates work similar to user settings. The template file is stored in the `AppData` Folder as `user_template.html`. It can be quickly accessed by pressing `F8`. Edit it as you see fit. 

It is strongly recommended that you keep the IE9 meta tag in the `<head>` section.

A `<div>` with an ID of `contents` is required. This is where the translated markup is inserted into the document.

When you change settings and save this file, Markdown Edit will immediately update to reflect the changes.

Delete it and Markdown Edit will create a new one.

## Spell Checking

Pressing `F7` will toggle spell checking. Spell checking is done as you type. Right-click on the word to get suggested spellings or to add to the dictionary.

The custom dictionary is a simple text file. It stored in the same folder as the user settings and user templates. It can be accessed and edited  by pressing `Shift+F7`.

Markdown Edit ships with dictionaries for many languages. Set the dictionary by pressing `F9`. The dictionaries are stored in the installation folder under `Spell Check\Dictionaries`.

## Themes

Markdown Edit has a rudimentary theme system. Themes, control the appearance of the editor and syntax highlighting. The UI  elements (i.e. dialogs) are not affected. 

Out of the box, Markdown comes with several themes which can be accessed by pressing `Ctrl+T`. Selecting a theme updates your user settings. You can further edit the theme by opening your user settings (`F9`) and editing the theme section. This is the recommended way to create a new theme.

Themes are located in the installation directory under `\Themes`.

If you create an awesome theme, send it to me and I'll add it to the distribution. I'm a lousy artist. :)

## Limitations

- Only supports CommonMark
- Single document Interface
- Syntax highlighting does not recognize multiple-line constructs. It uses regular expressions which don't understand the underlying Markdown constructs. I'm hoping as CommonMark matures that a syntax parser (like PEG) will emerge.
- I wrote it ;)

<button onclick="load_disqus('deskdrive', 'Desk Drive');" class="pure-button">Comments</button>
<div id="disqus_thread"></div>
