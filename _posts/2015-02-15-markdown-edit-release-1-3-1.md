---
layout: post  
title: 'Markdown Edit 1.3.1 Released'
---
Don't let the minor point release fool you. Version 1.3.1 is a significant update.

### What's New

  1. **Improved syntax highlighting:** Syntax highlighting is now based on an abstract syntax tree instead of regular expressions. What? That's a fancy way of saying the syntax highlighting is more accurate than previous versions.
  
  2. Added line numbering settings to the settings dialog.

Available on the [Downloads Page](http://mike-ward.net/downloads)

### Details

[Markdown Edit](http://mike-ward.net/markdownedit) offers visual hints in the editor for headings, lists, links, etc. This is often referred to as *syntax highlighting*. It's an enhancement to plain text that, if used wisely, can aid in visualizing the document structure.

Programmers are accustomed to seeing this kind of highlighting in their editors. It can make the text easier to comprehend. Or it can be gaudy if not judiciously applied (like the *Brain Salad Surgery Theme*).

Typically, the types of languages used by programmers are context-free, regular grammars and can be highlighted using simple pattern recognition (a.k.a. regular expressions). Markdown (or CommonMark if you prefer) is difficult to highlight due to its structure and expressiveness. As such, regular expressions can misinterpret many aspects of properly formatted Markdown documents.

Another approach to syntax highlighting is to build a data structure that represents the actual structure of the document as interpreted by Markdown. This is often referred to as an abstract syntax tree (AST). The AST allows the editor to *understand* the structure of the document. This understanding can lead to more accurate syntax highlighting.

Another benefit of the new highlighter is that the font size of the level 1 and 2 headings can be made larger to add emphasis.

Thanks go out to [Kārlis Gaņģis](https://github.com/Knagis), the author of the excellent [CommonMark.NET](https://github.com/Knagis/CommonMark.NET) library that powers Markdown Edit.
