---
layout: post
title: 'Tip: Delete long file names/folders'
---

I work with node packages frequently. The file paths are often longer
than what Windows will process. When trying to delete these files and
folders, you'll see an error message saying it can't delete the file
because the name is too long.

![QuickTipImage.jpg](http://i.imgur.com/ptxCreB.jpg)

The easiest and most consistent way I've found to delete these files and
folders is to use the node program `rimraf`.

<https://www.npmjs.com/package/rimraf>

After it's installed.

`rimraf somefolder`

It just works.
