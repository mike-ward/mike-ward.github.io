---
layout: post
title: 'Tweetz 3 – Release Candidate  4'
---
I was going to call this the final version for 3.0 but enough of you have complained about tweets not being sent that I thought I should do something about it. I suspect it’s a combination of exceeding quota and/or twitter jitters. In those cases, the gadget should report the issue and perhaps try again. In the meantime, here are the latest changes.

  * **Mentions**: Some of you have pointed out that mentions do not always get highlighted correctly. This happens when a mention also appears on your home timeline. It’s a race to has to which API call gets the tweet first. I’ve added code to scan every incoming tweet so mentions get indentified up immediately.
  * **Urls**: I found two more conditions where urls did not get indentified correctly. Tests written and fixes made.
  * **Purge Old Tweets**: I moved the check to purge old tweets to when tabs are clicked. This seems to be the best time to trim old tweets.
  * **Chirp**: I reduced the volume of the chirp by 12db.

Available on the [downloads page](/downloads).
