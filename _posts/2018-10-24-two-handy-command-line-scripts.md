---
layout: post  
title: "Two Handy Command Line Scripts"  
...

I use these two command line utilities every day. There's not much to
them but they do save me keystrokes and time.

### e.cmd

    @start notepad.exe %*

Open an editor and save this a `e.cmd`. Substitute your favorite editor
for `nodepad.exe`. This saves me a few hundred keystrokes a day.

    Example:
    
    e mytextfile.txt

### cp.cmd

    @echo|set /p=""%cd%\%*"" | clip

Save this to a file called `cp.cmd`. It copies the full file path of the
given file to the clipboard. The `set /p=` part is needed to suppress
the newline from the `@echo` command.

    Example:
    
    cp index.html
    => clipboard="C:\Users\mike\Documents\GitHub\mike-ward.github.io\index.html"

Not life changing, just handy.
