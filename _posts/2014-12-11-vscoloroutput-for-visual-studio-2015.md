---
layout: post  
title: 'VSColorOutput for Visual Studio 2015'
---
I updated the [VSColorOutput](http://mike-ward.net/vscoloroutput) installer a while back to allow installation on the Visual Studio 2015 preview. The binaries have not changed. As far as I can tell it works about as well as it did in VS2013.

There are (and have been) issues with color management. The most egregious of these is that the notification mechanism for font and color changes is broken. This happened way back in VS2010 and although Microsoft has acknowledged the issue, it has never been fixed.

What this means is that after you change colors you'll have to restart Visual Studio. If someone has some insight on this please contact me. VSColorOutput is open source.

Perhaps the bigger question is why colors don't always, "take" even after a restart. There are several things happening here, none of which I control.

VSColorOutput does not set colors directly. It can't. It can only, "suggest" colors to be used. In Visual Studio, you can add a `Classification` to a text segment in the output window. This `Classification` can contain styling information like foreground/background colors and bold. Text segments can and often do have multiple classifications. Visual Studio combines these classifications for the final output in a way I've never been able to understand.

Adding to the confusion is the use of `Default` and `Automatic` colors which have their own behaviors. I've found the foreground colors work mostly as expected. I've never been able to discern how the background colors work.

I have found a hacky way to get colors to work. It isn't pretty, but with enough patience I've been able to get colors to work properly, even with dark color schemes.

Here's my method:

- Change the colors as you want and restart Visual Studio
- If the colors are not what you expect change the theme (If light, go to dark for instance)
- Restart Visual Studio
- Change back to the original theme
- Restart Visual Studio

For me, the colors usually are what I expect after doing this.

![proof.png](http://mike-ward.net/cdn/images/blog/2014-12-11-vscoloroutput-for-visual-studio-2015/proof.png "VS2015 with gray background") 

After Visual Studio 2015 ships, I'll take another crack at getting Microsoft to fix the color change notification issue mentioned earlier.

Visual Studio extensions are difficult due the complexity of the API and behaviors. I imagine the ReSharper guys have a story or two about their travails.