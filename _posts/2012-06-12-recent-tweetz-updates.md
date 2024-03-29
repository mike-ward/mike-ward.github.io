---
layout: post
title: 'Recent Tweetz Updates'
---
![Hitting-Head-against-wall](/cdn/images/blog/Tweetz-Updates_D058/Hitting-Head-against-wall.jpg)Well, it started out simple. I had some corrections to some language translations (German and Italian). After adding the updated translations, I decided to fix something that has bugged me for a while. [tweetz](/tweetz) shows screen names instead of real names. Every other twitter client I've used shows the real name associated with the account. No problem, 5 minutes later I'm done and pushing out an update.

Wrong! A few hours later someone noticed the profile links were broken. OK, that took a little longer to fix but I'm good now. Nope, then another problem. And after that, another problem. So 5 releases later I think I'm finally stable again.

The 3.1.5.8 release actually fixes a bug not introduced by the name change. Entering accented characters in non-English languages usually involves some keyboard gymnastics like Ctrl+Shift+S. Unfortunately, tweetz sees Ctrl+S as a shortcut to send a message. The fix checks that only Ctrl+S sends the message. Adding other key combinations like Alt or Shift are ignored now.

Windows 8 is coming soon. I'm hoping that gadgets will get Web Socket support. If so, I should be able to add support for the twitter streaming interfaces. This allows faster updates and removes some of the status update limits imposed by the REST API.

Another idea I'm knocking around is adding/updating search results to the unified time line. Search terms would be added via the setting dialog (if I can figure out how to squeeze it in).
