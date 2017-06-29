---
layout: post  
title:  "Quick Tip - Clear ReSharper's Cache to Fix False Errors"  
...

I rely on ReSharper to spot errors and suggest code refactorings. I
particularly like how it can simplify boolean expressions. It's always
reminding me there are new features in the language (C\# and JavaScript)
that can improve my code.

But every once in a while ReSharper loses its mind...

By that I mean it starts flagging items as errors that are not. It seems
to happen in JavaScript more than C\#. Clearly, the ReSharper engine is
out of sync with the code. Once it gets into this funk, it stubbornly
remains that way for that file.

I've tried removing the code and pasting it back in or renaming the file
but it refuses to comply. I've learned to ignore it and over the course
of a few days, it eventually rights itself.

If only there was a way to reset it.

I don't remember where I spotted it on Twitter so I can't give credit,
but ReSharper has a way of clearing its cache, which effectively does a
reset. In the ReSharper options under the *General* tab, there's a
button to **clear the cache**.

![ReShaper options page](http://i.imgur.com/dcr4OpS.png)

It does require a restart of Visual Studio which is a bit unfortunate
but at least it gets rid of those errant red squiggles.
