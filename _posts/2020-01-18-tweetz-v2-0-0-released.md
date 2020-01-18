---
layout: post  
title: 'Tweetz 2.0.0 Released'
---

 Stick a fork in it, it's done! Tweetz 2.0 is a rewrite in Microsoft's latest technology, .Net Core 3.1. Long-time users should not fret however because the new version is very much in keeping in style and form with the 1.x version.

 > Stop talking fool and let me [download it](https://github.com/mike-ward/tweetz/releases/latest).

 So why the rewrite? Well, a number of things.
 
 The old code was crap. It started as a weekend hack and kind of got away from me. Also, I was itching for a chance to test-drive the new technology. The new code is still crap but less so.

 Some changes in the Twitter API were about to render parts of 1.x unusable. This already happened with Direct Messages.

 I was curious as to the effort required to write a Windows application in what is now the 2nd decade of the 21st century. To my surprise, it is still really hard. There are so many services and features in desktop applications that are not addressed in Microsoft's application framework. Simple things like remembering a window position or styling a title bar require hundreds of lines of low-level code to implement. Seriously Microsoft? We can't have an application model that handles the basics?

 WPF, the technology used to generate user interfaces, while quite powerful has a steep learning curve and more than a few gotchas. It takes hard work to get an application that looks good and doesn't consume all the system's resources.

 Ok, enough of the rant. I still like writing Windows programs more than any other platform I've worked in. I just wish Microsoft had an application service that took care of the busy work and looked good.

 Thanks to everyone who helped with beta testing. Testing is hard and requires insight and motivation. If it were up to me, I would have released this a month ago and that would have been a mistake.

 If and when you find issues, please report them on [GitHub](https://github.com/mike-ward/tweetz/issues). Discuss comments are Ok but it's much easier to track and verify in GitHub.  