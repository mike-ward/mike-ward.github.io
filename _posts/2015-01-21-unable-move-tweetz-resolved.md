---
layout: post  
title: "Unable to Move Tweetz Window Resolved (Sort of)"
---
Over the years, I've received a few reports about users not able to move the [Tweetz Desktop](http://mike-ward.net/tweetz) window using the mouse (click and drag). Unable to reproduce the issue, I could only offer the lame of excuse of, "Hey, it works on my machine". Now, thanks to a diligent user, there's a work around.

>`TL;DR` **Show windows content while dragging** must be enabled.

Steps to fix:

  1. Press `winkey + pause/break` to bring up the Windows System Dialog.
  2. Click `Advanced system settings`  
   ![system.png](http://mike-ward.net/cdn/images/blog/2015-01-21-unable-move-tweetz-resolved/system.png) 
  3. Click the `Settings` button in the *Performance* section  
  ![advanced.png](http://mike-ward.net/cdn/images/blog/2015-01-21-unable-move-tweetz-resolved/advanced.png) 
  4. In the `Visual Effects` tab, insure the  **Show windows content while dragging** is enabled.  
  ![performance.png](http://mike-ward.net/cdn/images/blog/2015-01-21-unable-move-tweetz-resolved/performance.png) 
  

From what I can tell, this is due to a design decision I made early on  not use the native window title bar. This allowed me more control over the appearance but also introduced this subtle bug with system settings. Had I been aware of this at the time, I would have chose a different path.

I'm investigating adding a check to warn users about this setting when it is disabled.

My apologies to those of you who encountered this issue and were ultimately frustrated. Try as I might, I sometimes get tripped up by numerous Windows configurations out there.