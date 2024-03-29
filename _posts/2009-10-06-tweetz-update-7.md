---
layout: post
title: 'tweetz Update #7'
---
[![tweetz](/cdn/images/blog/tweetzUpdate6_11AE8/tweetz_thumb.png)](/cdn/images/blog/tweetzUpdate6_11AE8/tweetz.png)

It’s been a busy month with school for the kids starting and other fall activities. I still managed to squeeze in some programming time however. This update includes an oft asked for feature – custom vertical sizing. You can set the height in the setting dialogs. I’m working on a more traditional click and drag technique but this will suffice for now. The docked and expanded height settings are independent.

The “look” has also been updated. Reader and tweetz user Alex has created a whole set of icons and images that give the interface some much needed polish. I’ve never had any ability or interest in drawing and have had to rely mostly on stock work when I can find it.

Alex’s icons provide just the right mix of style and elegance that I could never hope to accomplish on my own.

There’s also a host of small fixes that escape me. I use the gadget everyday so when I spot something wrong, I just fix it right then and there and then promptly forget about it, which is why I don’t have a “list” of changes.

Some of you have noted that updates from tweetz appear as “updated from API” on the home page. Twitter has changed its policy and requires new applications to both register and implement OAuth authentication. Only then will they append from [MyApp] to updates.

I’ve experimented with some JavaScript libraries that implement OAuth, but the results from the user experience perspective are poor. Instead of a name and password, you supply your twitter account. The application then gives you a link that takes you to a Web page. On the Web page you “grant” permission to the requesting application to access your account. The Web page then presents a PIN number that you copy and paste into the application.

I find it confusing to explain and I’m the programmer. For now, I’m sticking with plain old username/password. It’s not as secure but this is Twitter we’re talking about here.

Alex also supplied me with icons to implement highlighted tabs to indicate that new tweets/messages are available. I’ve not implemented this feature in this update. Probably the next update.
