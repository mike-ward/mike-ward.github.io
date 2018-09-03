---
layout: post  
title: "Tweetz 1.3 Release"  
...

In brief: Removing streaming API because twitter killed it. Add multiple
image and video playback support.

[Download](https://github.com/mike-ward/tweetz-desktop/releases/latest)

Twitter continues its quest to destroy third-party clients by once again
crippling their API. This time the streaming interface has been
eliminated. There are also changes to the direct-message API.

I've removed the streaming API. The client now polls for new tweets.
Since the polling is throttled, the updates will be are limited to about
one per minute.

This release does not use the new direct-message API.

Since I was in there I added a couple of new features.

### Multiple Image Support

If a tweet has multiple images, they are displayed. Click on each one to
see a full-size image.

![center](https://i.imgur.com/cot1fja.png)

### Video Playback

If a video is present, it will play when you click on it.

I think several of you have sent in translations. I'll add those when I
update the direct-message API.

