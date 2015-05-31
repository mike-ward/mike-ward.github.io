---
layout: post
title:  "Markdown Edit 1.8"
---

One of the fun things about a project like <http://mike-ward.net/markdownedit/>
is the endless amount of tweaking one can do. Just about the time I think I'm
done with it, someone suggests a new feature or I read an article that inspires
some new thinking.

Many of the new features in this release are inspired directly from Brett
Terpstra's,
<http://brettterpstra.com/2012/05/06/my-ultimate-markdown-editor-wishlist/>
article.

So what's new?

* `Alt+Up,Alt+Down` moves the current line/selection up or down. Great for
  reordering lists. Much faster than cut/paste.
* `Ctrl+L` converts the current selection to an unordered list. Press it again
  and it becomes an ordered list. Press it again and it becomes an unordered
  list Press it again and you're a software tester.
* `Ctrl+Q` converts a selection/line to a block quote. Press multiple times to
  further block quote.
* `Alt+F` formats the current selection/document. Not a new feature but the
  converter now adheres to <http://commonmark.org> standard. `Alt+Shift+F` to
  unwrap and format.
* Format on save. Saves you a couple of presses if that's your thing.
* Default theme changed to Zenburn. Reviewers' screen shots look better using
  the darker theme.
* Removed the user configurable keyboard bindings. They kept getting in my way
  during development and slowed down program startup. Sorry if this impacts you
  but they were just more trouble than I anticipated.

There are other ideas in Brett's article like link pasting, auto-complete link
references, etc., that I'll be implementing in future versions.

Available on the <http://mike-ward.net/downloads/>

