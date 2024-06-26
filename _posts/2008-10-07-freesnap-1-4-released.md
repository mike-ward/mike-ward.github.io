---
layout: post  
title: 'FreeSnap 1.4 Released'
---
[FreeSnap 1.4](/freesnap) is available for download. New features include incremental size, a configuration file for settings, 64 bit support and a help dialog. The help dialog is a handy reference for all the keyboard shortcuts. Press the `Windows Key+?` combination to bring it up.

![FreeSnap Help Dialog](/cdn/images/freesnap/freesnaphelp.png)

Incremental sizing “grows” or “shrinks” a window edge by 10 pixels. This allows you to nudge a window to a slightly larger or smaller size.

A configuration file was added to allow custom sizes to be added to the resize option. It’s located in the application folder. You’ll have to stop and start the program for the new settings to take affect.

Finally, there’s an x64 version available. I don’t have a 64 bit machine so I could not verify that it actually works. Sorry, but someone will have to be the Ginny Pig on this one. The code compiled under x64 with almost no modifications (a couple of casts were needed to eliminate some minor warnings). I don’t expect any issues. Let me know how it works on your 64 bit systems.

I also fixed a bug in the “move to next monitor” function. Maximized windows did not behave correctly. The fix required restoring the window, moving it, and then maximizing it again.

That’s all for now. Enjoy!
