---
layout: page  
title:  Freesnap
---
*Version 1.5.3 released 6 June 2009*

> Manually resizing windows can be a pain, and getting them to line up along the
> side of the screen is an unwelcome dexterity test. With FreeSnap, you can move
> and resize windows with your keypad. Just fire up the program, and you can use
> hotkeys to center windows or send them to all corners of the screen. You can
> use the ""plus"" and ""minus"" keys to resize windows without tiresome
> clicking and dragging.  [August 2005 - PC World]

Ever try to size a window so it just touches the edge of the screen? It’s
tedious (at least for me). FreeSnap allows you to instantly resize any window
edge to the corresponding screen edge. Want that window to touch the right edge
of the screen? Press and hold the left “Windows Key” (see illustration below)
and press the right arrow. It’s just that simple. The number-pad keys work as
well, regardless of the NumLock state.

![noborder](/cdn/images/freesnap/keyboard.png)

Press **Windows Key + ?** to bring up the help screen (notice the Donate
button).

![noborder](/cdn/images/freesnap/freesnaphelp.png)

The Home, End, PgUp, and PgDn keys move a window to the corresponding corner of
the screen without resizing the window. I like to think of these as the “corner
keys”.

If you think about it, the number-pad makes an easy template for remembering how
to size and move windows. The arrow keys size windows, and the corner keys
(7,9,1,3) move windows to the corner of the screen.

The “Plus” and “Minus” keys on the number-pad will resize the window to a
specific dimension. The dimensions used are:

640 x 480  
800 x 600  
1024 x 768  
1152 x 864  
1280 x 1024

This is handy for seeing how your artwork will fit on standard size screens.
Sizes can be added or removed by editing the FreeSnap.cfg file in the
application folder (usually C:\\Program Files\\Blue Onion Software\\FreeSnap).
You'll need to restart FreeSnap for the settings to take affect.

The “5” key on the number-pad centers the window on the screen without resizing
it. The number-pad ""Enter"" key will maximize the window when it is normal size
and vice-versa. The ""0"" key will minimizes the window.

When multiple monitors are detected, FreeSnap remaps the ""5"" key to move the
window from one monitor to the next.

Half screen sizing: You can size any window to a half or even quarter of the
screen by using pressing Win+arrowkey+arrowkey. The second arrow key press will
pull the opposite edge to the middle of the screen. \\ This works in both the
vertical and horizontal directions. This mimics the same behavior featured in
Windows 7 but with keyboard shortcuts instead of mouse moves.

The half screen sizing replaces the undo feature. If you prefer the undo feature
to half screen sizing, you can turn it on in the config file. Repeating the last
command will then undo the command and restore the window.

You can grow and shrink an edge by 10 pixels by pressing Windows Key + Ctrl +
(an arrow key) or Windows Key + Shift + (an arrow key).

An alternate set of keys that are more suitable for laptop users is available.
The keys are:

-   Windows Key + I snap to top edge
-   Windows Key + K snap to bottom edge
-   Windows Key + J snap to left edge
-   Windows Key + L snap to right edge
-   Windows Key + T move window to top-left corner
-   Windows Key + G move window to bottom-left corner
-   Windows Key + Y move window to top-right corner
-   Windows Key + H move window to bottom-Windows
-   Windows Key + C center window (move to next monitor when multiple monitors
    detected)
-   Windows Key + Z grow window
-   Windows Key + X shrink window

#### Running FreeSnap

You can start and stop FreeSnap by using the menu items. The only indication
that FreeSnap has started is the brief banner that appears when you start it.
There is no tray icon (heck, you probably have about 20 of those if you’re like
me). The installation automatically places a shortcut to FreeSnap in the Startup
folder. You can delete the shortcut if you don’t want FreeSnap to start
automatically.

#### Configuration File Options

All options are set in the FreeSnap.cfg file located in the installation folder.
Edit with notepad and then restart FreeSnap. The default values are:

-   banner: yes
-   taskswitch: yes
-   undo: no
-   usealtkeys: no
-   size: 640,480
-   size: 800,600
-   size: 1024,769
-   size: 1152,864
-   size: 1280,1024

#### Command Line Options

The “-stop” option will stop FreeSnap.

#### Requirements

-   Windows 2000 or Windows XP or Windows Vista
-   A keyboard with the “Windows” key

#### History

-   Version 1.5, 7 December 2008: Added task switching, moved all options to
    config file, half screen sizing
-   Version 1.4, 6 October 2008: Close window, Incremental sizing, Config file,
    Help screen, x64
-   Version 1.3, 10 June 2008: Multi-Monitor support
-   Version 1.2, 1 November 2004: -noalternatekeys option, minimize, fix
    documentation errors
-   Version 1.1, 10 September 2002: Additional keys, -nobanner option
-   Version 1.0, 31 July 2002: First Release

<a href="https://github.com/mike-ward/FreeSnap"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"></a>
