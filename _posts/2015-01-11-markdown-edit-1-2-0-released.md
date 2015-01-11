---
layout: post  
title: 'Markdown Edit 1.2.0 Released'
---
### What's New

  - Snippets extended to support substitution parameters
  - New snippets added for quick insertion of links and images
  - List continuations add list markers as you type
  - Scroll to last position in recent documents
  - Mission Statement and Contributor Guidelines added

***
Enough already! Let me download the darn thing. [Downloads Page](http://mike-ward.net/downloads)
***

### Snippets

Snippets can now include substitution parameters. This allows the snippet to prompt for additional text after being triggered. Sounds complicated but in practice it's simple to use. Let's look at an example:

    link    [$link_name$]($link_url$) $END$
    
When triggered, the snippet will expand as `[link_text](link_url)`, with `link_text`, highlighted. Type the link text and press `TAB`. Now the `link_url` text is highlighted. Enter the link URL and press `Enter`. The cursor moves one space past the closing parenthesis. 

Try it and you'll see that it's an easy and natural workflow.

The list of default snippets is extended. If you're upgrading from an earlier version you can add them manually by pressing `F6` and copying the text below.

    row       $DATE("f")$ $END$
    date      $DATE("d")$ $END$
    time      $DATE("t")$ $END$

    img       ![$alt_text$]($image_url$) $END$
    link      [$link_text$]($link_url$) $END$

    tm        &trade;
    cp        &copy;
    reg       &reg;

### List Continuations

List continuations supply the next list marker when composing unordered or ordered lists. This is particularly handy when creating numbered lists. It's automatic and requires no keyboard shortcut. 

Start as list as usual. When you're ready to add the next list item, simply press `Enter`. The next list marker will automatically be added after the new line.

### Scroll to Last Position

Markdown Edit remembers the last cursor position when the document is saved. Open it from the *Recent Files* dialog and it will scroll to that position. This feature can be disabled if desired in the user settings.

### Mission Statement and Contributor Guidelines

I attended a presentation at [Codemash](http://codemash.org) about how to run an open source project. It was quite an interesting talk. I hadn't considered a [Mission Statement](https://github.com/mike-ward/Markdown-Edit/wiki/Mission-Statement,-Roadmap,-Contributor-Guidelines) as a form of guidance for the project. Seems obvious when you think about it but then many things in life are that way.

Contributor guidelines sounds way more formal than it is. It's just a list of ways to contribute to the project.

Available on the [Downloads Page](http://mike-ward.net/downloads).


