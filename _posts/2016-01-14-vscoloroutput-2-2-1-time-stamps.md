---
layout: post  
title: "VSColorOutput 2.2.1 - Time Stamps"
---

When I'm looking at debug output, often I'm curious about when the event
of interest has occurred. I've seen tools that add clock time to the
output but I don't find that useful. I'm interested in relative time
from the beginning of the debug session and between events.

This version adds time stamps to the debug window. Time stamps are the
elapsed time from the beginning of the debug session. The number in
parenthesis is the elapsed time from the previous event. Many lines have
the same time stamps. Only when the time stamp changes is it shown. Time
stamps is an optional setting and can be turned off.

![image](https://cloud.githubusercontent.com/assets/567927/12311797/b3970fe6-ba27-11e5-999b-b1de37ad5003.png)

This feature is still somewhat experimental so please do send feedback
about it.

[VSColorOuput Download](https://www.visualstudiogallery.msdn.microsoft.com/f4d9c2b5-d6d7-4543-a7a5-2d7ebabc2496)
