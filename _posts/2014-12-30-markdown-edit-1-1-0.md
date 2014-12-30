---
layout: post  
title: 'Markdown Edit 1.1.0 Released'  
---
Version 1.1.0 is all about the keyboard.

### Snippets

Snippets allow the quick insertion of words or phrases by typing a trigger word and then the `TAB` key. This can improve the speed and proficiency of writing documents.

Snippets are inserted by typing a trigger-word and then the `TAB` key. For instance, type `date+TAB`. The word *date* is replaced by the current date and time.

To define additional snippets press `F6`.

Snippets consist of a single line starting with:

  - a single trigger word (can include non alpha-numerics)
  - one or more spaces
  - text that will replace the trigger word
  
Here's a simple one I often use:

    sig   Mike Ward
    
There are special keywords that can be used in snippets.

  - `$END$` - Sets the cursor position after insertion

  - `$DATE$` - Insert the current date and time.
  
  - `$DATE("format")$` - Inserts a date with the given format. See <http://www.dotnetperls.com/datetime-format> for a list of support formats.
  
  - `\n` - insert a new line

### Custom Key Bindings

Press `F10` to edit the key bindings. Make your changes and save. The changes take affect immediately. 

### Other Changes

  - Changed the inline code block and link highlighting in the *Paper* theme.
  
  - Bold, Italic and Inline Code Block shortcuts will automatically select the current word if there is no selection
  
  - Remove`F5` date insertion in favor of snippets
  
  - Add syntax highlighting for lists
  
  - Bug fixes


### Tips

  - Try using "Century Gothic" if installed. I think it's one of the best fonts for text editing.
  
  - Indent your lists 2 spaces. They wrap nicely and look better in plain text.
  
  - Use `F12' to turn off preview and focus on just writing text.
  
  - Most settings are saved in plain text files making them easy to share with others.
  
Available on the [Downloads Page](http://mike-ward.net/download)