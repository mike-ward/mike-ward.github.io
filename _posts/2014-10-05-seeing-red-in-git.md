---
layout: post
title:  "Seeing Red in Git"
---
I have a hard time seeing the color red in the Windows command prompt.
This is particularly bothersome when I'm using [Git](http://git-scm.com/).
I've tried changing the background but there are some utilities (I'm looking at you [Chocolatey](http://chocolatey.org/))
that change the background back to black.

I've altered my `.gitconfig` file as follows:

    [color]
        ui = auto

    [color "status"]
      added = cyan bold
      changed = cyan bold
      nobranch = cyan bold
      untracked = cyan bold
    
    [color "diff"]
      old = cyan bold
    
    [color "branch"]
      remote = cyan bold

Example:

![image](/cdn/images/blog/2014-10-05-seeing-red-in-git/git-screen-shot.png)

A nice reference to the default colors in Git can be found at [Shallow Thoughts](http://shallowsky.com/blog/programming/gitcolors.html).