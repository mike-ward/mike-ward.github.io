---
layout: post
title: 'Tweetz 3.0 Released'
---
Finally broke out the fork and declared it done. The long lapse from the last release candidate was mostly because I was waiting for the 1.4.3 release of jQuery hoping it would address a few issues I was having (it did).

The differences between 2.3.5 and 3.0 are mostly on the inside. I needed to address some structural issues in the code in order to move forward with some new features. One feature of note is the new unified timeline. When I first starting writing [tweetz](/tweetz), I was going to include a unified timeline and then talked myself out of it for some reason. I don’t remember why, but it’s my favorite thing about the gadget now.

![Stick A Fork In It](/cdn/images/blog/Tweetz-3.0-Released_10643/Stick-A-Fork-In-It.jpg)

For version 3.1 I’m planning a complete rewrite (NOT!) Just kidding. Based on feedback the it looks like, localization, spell checking and auto-completion are the top requests. That sounds about right amount for a point release.

And if Microsoft ever gets its act together and supports rounded CSS corners, I’ll put all those lovely curves back in the gadget. Some have asked why I removed the rounded edges and the simple answer is performance. All those JavaScript cycles to paint pretty corners ate into the performance profile of the gadget. I like pretty but I require speed first.

My other favorite feature are the new tweet indicators on the timelines. That little bit of orange in the corners of the tab buttons is just enough to let me know there’s something new without making me feeling like I have to turn it off immediately. Also, I can clear the indicator my simply passing the mouse over the tab. No clicking or changing focus required.

From a technical standpoint, the auto-linking detection was the most challenging task. The rules for parsing twitter text are arcane and counter-intuitive. Duplicating twitter’s behavior in JavaScript was both challenging and fun.

Available on the [downloads page](/downloads).
