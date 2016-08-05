---
layout: post  
title:  'Exploring Mithril, A JavaScript Framework for Building Brilliant Applications'  
...

[Mithril](http://mithriljs.org/) is a JavaScript framework for writing
web site front ends. It's similar to React but is easier to understand,
faster and much much smaller (7.8K compressed).

> *Note: I'm using the current stable release of Mithril (v0.2.4).
> Version 1.0 is coming soon. It will introduce a few minor changes.
> I'll post a follow up about v1.0 here when that happens*

What's surprising is despite its tiny size, it's a more potent solution
than React. It provides a templating engine with a virtual DOM
differencing implementation for performant rendering, utilities for
high-level modeling via functional composition, support for routing,
HTTP requests and componentization. Just enough functionality to hit
that sweet of generating forms and making service requests without
having to, "Download the Internet."

> *Note: I'm assuming you have a passing familiarity with React or other
> React like frameworks.*

OK, so what does it look like? Assuming that `mithril.js` is already
loaded on the page:

    m.mount(document.body, { view: () => 'hello world' });

[CodePen](https://codepen.io/mikeward/pen/vKzojg/?editors=0010)

Points of interest:

-   Components are plain old JavaScript objects. They're not inherited
    from a base class.
-   A component only needs a `view` method that returns a virtual
    element or in this case a string.
-   Components are loaded via
    [`m.mount()`](http://mithriljs.org/mithril.mount.html) (similar to
    other frameworks).
-   There's very little boiler plate required to bootstrap a
    Mithril application.

A one-line "Hello World" program is fun but are hardly illustrative
Mithril capabilities. Here's a more canonical example with, "Hello
World" embedded in an `<h1>` tag.

    const helloWorld = {
      view: () => m('h1', 'Hello World')
    }

    m.mount(document.body, helloWorld);

[CodePen](https://codepen.io/mikeward/pen/WxgVyy/?editors=0010)

Points of interest:

-   Virtual elements are constructed using
    [`m()`](http://mithriljs.org/mithril.html)
-   Virtual elements can have children elements.
-   Components are referred to by value (not strings).
-   There is no markup-like template language. Templates are expressed
    as functions (like React, Elm, Vue, etc.)

Let's get slightly more ambitious and process some form data. This
example extends our component to include an input box. As you type in
the input box, the contents are echoed back.

    let youSaid = '';

    const helloWorld = {
      view: () => [
        m('h1', 'Hello World'),
        m('input', {
          value: youSaid,
          oninput: e => youSaid = e.target.value
        }),
        ' You said: ' + youSaid
      ]
    }

    m.mount(document.body, helloWorld);

[CodePen](https://codepen.io/mikeward/pen/EyZqZx/?editors=0010)

Points of interest:

-   Virtual elements can have children. Multiple children elements are
    expressed as an array
-   Literal strings are, um, err literal strings.
-   Components simply reflect the state of the model.
-   Mithril does not have an eventing system. Use DOM events.
-   Redrawing occurs automatically for mounted components on events
    (`oninput` in this case).
-   For the sake of brevity I'm using a simple global data model,
    `youSaid`.

Next let's look at how Mithril handles iteration. We'll take the example
above and have it split the input into an array of characters and put
those characters into a list.

    let youSaid = '';

    const helloWorld = {
      view: () => [
        m('h1', 'Hello World'),
        m('input', {
          value: youSaid,
          oninput: e => youSaid = e.target.value
        }),
        ' You said: ' + youSaid,
        m('ul', youSaid.split('').map(c => m('li', c)))
      ]
    }

    m.mount(document.body, helloWorld);

[CodePen](https://codepen.io/mikeward/pen/BzOXqY/?editors=0010)

Points of interest:

-   No special iteration constructs are required. Standard JavaScript
    works just fine.
-   JavaScript is often less verbose than markup.

Let's add a button to reset everything.

    let youSaid = '';

    const helloWorld = {
      view: () => [
        m('h1', 'Hello World'),
        m('button', { onclick: () => youSaid = '' }, 'Clear'),
        ' ',
        m('input', {
          value: youSaid,
          oninput: e => youSaid = e.target.value
        }),
        ' You said: ' + youSaid,
        m('ul', youSaid.split('').map(c => m('li', c)))
      ]
    }

    m.mount(document.body, helloWorld);

[CodePen](https://codepen.io/mikeward/pen/VjGoVm/?editors=0010)

Points of interest:

-   Mithril does not have an eventing system. Use DOM events (I know, I
    said it twice).

If a component has several distinct parts I like to break it up into
additional components. Let's separate the `button` control into a new
component.

    let youSaid = '';

    const clearButton = {
      view: () => m('button', 
        { onclick: () => youSaid = '' }, 'Clear')
    }

    const helloWorld = {
      view: () => [
        m('h1', 'Hello World'),
        m(clearButton),
        ' ',
        m('input', {
          value: youSaid,
          oninput: e => youSaid = e.target.value
        }),
        ' You said: ' + youSaid,
        m('ul', youSaid.split('').map(c => m('li', c)))
      ]
    }

    m.mount(document.body, helloWorld);

[CodePen](https://codepen.io/mikeward/pen/akaZPO/?editors=00100)

Points of interest:

-   Components can include components (`m(clearButton)`).
-   Constructing new components requires little ceremony.

If we remove `youSaid` dependency from the `clearButton`, it becomes a
reusable component.

    let youSaid = '';

    const clearButton = {
      view: (_, args) => m('button', 
        { onclick: args.clickAction }, 'Clear')
    }

    const helloWorld = {
      view: () => [
        m('h1', 'Hello World'),
        m(clearButton, { clickAction: () => youSaid = ''}),
        ' ',
        m('input', {
          value: youSaid,
          oninput: e => youSaid = e.target.value
        }),
        ' You said: ' + youSaid,
        m('ul', youSaid.split('').map(c => m('li', c)))
      ]
    }

    m.mount(document.body, helloWorld);

[CodePen](https://codepen.io/mikeward/pen/wWEVRj/?editors=0010)

Points of interest:

-   Properties can be passed to components.
-   Components are easily parameterized. Again, no special syntax, just
    JavaScript

For that matter, why not make `helloWorld` a reusable component? We'll
do this is two steps. Step 1:

    let youSaid = m.prop('');

    const clearButton = {
      view: (_, args) => 
        m('button', { onclick: args.clickAction }, 'Clear')
    }

    const helloWorld = {
      view: () => [
        m('h1', 'Hello World'),
        m(clearButton, { clickAction: () => youSaid('')}),
        ' ',
        m('input', {
          value: youSaid(),
          oninput: e => youSaid(e.target.value)
        }),
        ' You said: ' + youSaid(),
        m('ul', youSaid().split('').map(c => m('li', c)))
      ]
    }

    m.mount(document.body, helloWorld);

[CodePen](https://codepen.io/mikeward/pen/zBJgbY/?editors=0010)

Points of interest:

-   `youSaid` has been changed to a getter/setter function. To retrieve
    the current value use `youSaid()`. To set it use `youSaid(value)`.
-   [`m.prop()`](http://mithriljs.org/mithril.prop.html) is a simple
    helper method that creates a getter/setter function. It does not
    trigger redraws or otherwise participate in Mithril's
    rendering logic. It's just a factory method (don't over think it)
-   It's standard practice to use `m.prop()` in Mithril programs.
    Although not required it is helpful in many uses cases. You can read
    more about the design motovation behind `m.prop()` in [Mithril's
    blog](https://lhorie.github.io/mithril-blog/the-uniform-access-principle.html).
-   You may be wondering what the `_` parameter in `view` is for.
    Mithril components can have an optional controller function which is
    later passed to the view via the first parameter. We're not using
    controllers in these examples so I'm using an `_` to indicate it's
    not used.

Let's get rid of the global reference and inject `youSaid` into the
`helloWorld` component. Step 2:

    const clearButton = {
      view: (_, args) => 
        m('button', { onclick: args.clickAction }, 'Clear')
    }

    const helloWorld = {
      view: (_, args) => [
        m('h1', 'Hello World'),
        m(clearButton, { clickAction: () => args.model('')}),
        ' ',
        m('input', {
          value: args.model(),
          oninput: e => args.model(e.target.value)
        }),
        ' You said: ' + args.model(),
        m('ul', args.model().split('').map(c => m('li', c)))
      ]
    }

    m.mount(document.body, m(helloWorld, {
      model: m.prop('')
    }));

[CodePen](https://codepen.io/mikeward/pen/YWOmgk/?editors=0010)

Points of interest:

-   `helloWorld` no longer relies on a global model
-   Mithril's constructs encourage reuse (actually, it makes it
    downright fun).

Just for fun, let's break the other parts into components.

    const clearButton = {
      view: (_, args) => 
        m('button', { onclick: args.clickAction }, 'Clear')
    }

    const inputEcho = {
      view: (_, args) => m('span', [
        m('input', {
          value: args.model(),
          oninput: e => args.model(e.target.value)
        }),
        ' You said: ' + args.model()
        ])
    }

    const repeater = {
      view: (_, args) => 
        m('ul', args.model().split('').map(c => m('li', c)))
    }

    const helloWorld = {
      view: () =>  
        m('h1', 'Hello World')
    }

    const demo = {
      view: (_, args) => m('div', [
        m(helloWorld),
        m(clearButton, { clickAction: args.reset }),
        ' ',
        m(inputEcho, { model: args.model }),
        m(repeater, { model: args.model })
      ])
    }

    const youSaid = m.prop('');

    m.mount(document.body, m(demo, { 
      model: youSaid,
      reset: () => youSaid('')
    }))

[CodePen](https://codepen.io/mikeward/pen/EydmQN?editors=0010)

Points of Interest:

-   It's easy to reason about and refactor components in Mithril.
-   Composition using components fits nicely with rendering HTML.

Other random things I really like about Mithril

-   Mithril has a concise high-level utility for working with web
    services called `m.request`. It even supports JSONP.

-   It also contains a routing system (`m.route()`) to help create
    Single Page Applications (SPA).

-   There's a simple but effective promise system to handle asynchrony.

-   The documentation is outstanding. It's written by hand, not
    generated from code. The author has done a great job explaining how
    the API's work and the motivation behind why it works as it does.

-   It's fast. It most cases it's much faster than React. You can see
    the [benchmarks](http://mithriljs.org/benchmarks.html) on the
    web site. [Repaint Rate
    Challenge](https://mathieuancelin.github.io/js-repaint-perfs/) also
    has some interesting benchmarks. Like all benchmarks, take them with
    a grain a salt. My take away is that framework performance is not
    an issue.

-   The [Gitter](https://gitter.im/lhorie/mithril.js) chat group is
    helpful and friendly.

-   If you like using JSX, there's an [MSX
    tool](http://mithriljs.org/tools.html) for Mithril that does the
    same thing.

-   [Templates can be
    compiled](http://mithriljs.org/optimizing-performance.html) for that
    last bit of performance tweaking.

-   Works great with Typescript. Mithril has a [type definition
    file](https://github.com/lhorie/mithril.js/blob/next/mithril.d.ts)
    in the respository.

-   Supports ancient versions of Internet Explorer (with
    additional work)

-   A surprising number of [big name sites use
    Mithril](https://github.com/lhorie/mithril.js/wiki/Who-Uses-Mithril)
    including Nike and MLB.com

-   The wiki contains lots of other useful stuff like [Recipes and
    Snippets](https://github.com/lhorie/mithril.js/wiki/Recipes-and-Snippets).

So is there a downside? I'm not seeing one at the moment but then I've
only causally explored the framework. Mithril does require a solid
understanding of JavaScript and the Document Object Model (DOM). The DOM
in particular was a tripping point for me. Mithril makes no attempt to
normalize the DOM or events. You get them raw and unfiltered. Several
times I stumbled thinking it was Mithril only to later find it was
really just how the DOM works.

This was a whirlwind tour of Mithril that skipped over many aspects of
the framework. Hopefully I've shown enough here to peak your interest
without overwhelming you with details.

Finally, I've put together an example of a rudimentary iTunes browser.
This is the standard little toy application I write when I explore a new
framework. It demonstrates, in a bit more structured way, forms
processing, table generation, micro-service requests, column sorting and
even a fun little video player.

[Mithril iTunes Browser](https://github.com/mike-ward/mithril-itunes)

![screen shot](http://i.imgur.com/KSdGCtq.png)

The only (JavaScript) dependency is Mithril. It's written in Typescript
because that's the way I, “Rick Roll”.
