---
layout: post  
title: GitHub Pages
---
> `TL;DR`
>
> 1. GitHub Pages serves static Web content only
> 2. GitHub Pages can generate that content from a template
> 3. You don't need Ruby, or Python or special tools to do this
> 4. GitHub Pages serves pages fast (really fast actually), reliably and supports custom domains

If you're reading this blog, and you don't yourself blog, your an, *information taker*. How do you live with yourself knowing you shamefully consume without giving?

OK, in case it isn't clear, **I'm kidding**. I'm betting you're actually a nice person who really wants to share but hasn't found a convenient way to do it.

You can use many of the free and paid options like [Wordpress](https://wordpress.org/), [Blogger](https://www.blogger.com), [Ghost](https://ghost.org/), etc. They're very good at what they do but I've always have had issues with them like performance or maintainability.

There are hosting services that will let you run your own software. I did this for years and it worked, but it was work. I learned much a long the way so I'm not complaining.

A few years ago, [GitHub](https://github.com/) started a service called [GitHub Pages](https://pages.github.com/). When I first looked at it a year ago, I didn't care for it. Mostly because it was presented in a confusing manner. *Recently, the home page has been updated with a more straightforward process.*

Here's the easiest way to understand GitHub Pages.

> GitHub Pages are static Web pages

Yep, that's it. Put your static content in a correctly named repository and you get free Web site hosting.

But wait you say, "I'm writing a blog, not a static Web site."

Actually, most blogs are a collection of articles. The only time something changes is when a new article is added. While many blog engines use a backing store (database, file system, alien artifacts.) and create content on request, it can also be done by rebuilding the entire site when new content is added. This is typically done with a static site generator.

You'll find there are static site generators written for almost any platform and language. I particularly like [harp](http://harpjs.com/).

With a static site generator you can add a new blog article, press a button (so to speak) and churn out a new Web site. Many site owners do just that including [Bootstrap](http://getbootstrap.com/) and [Foundation](http://foundation.zurb.com/).

Still too much work? Yeah, that was my feeling also.

Remember when I said GitHub Pages only serves static Web pages? **I was lying** (just a little bit).

GitHub Pages will build the static site for you. This is where the message got a little confusing for me earlier because the original documentation jumped right into static site generation.

I'll get into how this works latter. It's actually much simpler than it may seem looking at the documentation. You don't need to install Ruby and Python and Node to use GitHub Pages. To prove it, here's my typical work flow for writing a blog article.

 1. Create an article using my favorite Markdown editor (you can use straight HTML if that's your thing, but I find Markdown much easier to compose with).
 
 2. Save the article to the `_posts` folder in my cloned repository.
 
 3. At a command line type: `git cm "article name"`
 
 4. Type: `git push`

And I'm done. It usually takes GitHub less than 10 seconds to build and post the new content.

*Note: `git cm "article name"` is a personal git macro which is equivalent to `git commit -a -m "article name"*

So let's recap:

 1. Create a repository on GitHub with the correct name (we'll get to that shortly)

 2. Add some static content (at a minimum an index.html)

 3. Push to GitHub

You can eliminate step 3 by editing the content directly on GitHub.

### Jeykll

GitHub Pages uses a static site generator called [Jekyll](http://jekyllrb.com/). While you can use any site generator you like, the advantage of Jekyll is that GitHub Pages will process your repository using Jekyll any time that repository is updated.