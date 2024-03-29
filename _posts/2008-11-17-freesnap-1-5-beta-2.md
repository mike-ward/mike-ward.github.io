---
layout: post  
title: 'FreeSnap 1.5 Beta 2'
---
![construction](/cdn/images/blog/FreeSnap1.5Beta_117EF/beta.jpg)

Last week, I [released beta 1](/blog/post/2008/11/11/freesnap-1-5-beta) which introduced a new style of task switching. Beta 2 includes additional features.

  * All configuration settings are contained in a configuration file (FreeSnap.cfg) 
  * Half screen resizing 

The command line switch thing was starting to get out of hand so I replaced it with a configuration file which is easier to manage and edit.

The “Half-screen” resizing is an idea I got when I saw the new window sizing demos at the recent PDC in Los Angeles. Apparently, Microsoft thought it was useful enough to not only add it to the operating system, but to showcase it at the PDC.

Recall that you can quickly “Snap” any window edge to its adjacent screen edge using FreeSnap’s shortcut key Win+arrow-key. If you press the same sequence again, it returns the snapped border to its original position. It served as sort of a “undo” function.

In the new version, the second key sequence will snap the opposite border to the middle of the screen. This effectively makes the window half the width or height of the screen.

To illustrate the process:

![one](/cdn/images/blog/FreeSnap1.5Beta2_108D3/one_thumb.jpg)

Original

![two](/cdn/images/blog/FreeSnap1.5Beta2_108D3/two_thumb.jpg)

Win + Left Arrow

![three](/cdn/images/blog/FreeSnap1.5Beta2_108D3/three_thumb.jpg)

Win + Left Arrow again

If you have several windows, you can quickly tile them side by side or even 4 up.

I have not heard anything about the new task switching feature. I take that to mean that it is working as expected and that I write perfect code and that you can’t possibly think of any improvements. :)

[FreeSnapBeta.msi](/download.aspx?filename=Downloads/FreeSnapBeta.msi)
