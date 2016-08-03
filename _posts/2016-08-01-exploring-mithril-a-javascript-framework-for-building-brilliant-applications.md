---
layout: post  
title:  'Exploring Mithril, A Javascript Framework for Building Brilliant Applications'  
...

[Mithril](http://mithriljs.org/) is a JavaScript framework for writing
web site front ends. It's similar to React but is easier to understand,
faster and much much smaller (7.8K compressed).

What's surprising is despite its tiny size, it's a more potent solution
than React. It provides a templating engine with a virtual DOM
differencing implementation for performant rendering, utilities for
high-level modeling via functional composition, support for routing,
HTTP requests and componentization. Just enough functionality to hit
that sweet of generating forms and making service requests without
having to, "Download the Internet."

*Note: I'm assuming you have a passing familiarity with React or other
React like frameworks.*

OK, so what does it look like? Assuming that `mithril.js` is already
loaded on the page:

    const helloWorld = {
      view: () => m('h1', 'Hello World')
    }

    m.mount(document.body, helloWorld);

[CodePen](https://codepen.io/mikeward/pen/pbOvZQ)

Points of interest:

-   Components are plain old JavaScript objects. They're not inherited
    from a base class.
-   A component only needs a `view` method that returns a
    virtual element.
-   Virtual elements are constructed using
    [`m(...)`](http://mithriljs.org/mithril.html)
-   Components are referred to by value (not strings).
-   There is no markup-like template language. Templates are expressed
    as functions (like React, Elm, Vue, etc.)
-   Components are loaded via
    [`m.mount(...)`](http://mithriljs.org/mithril.mount.html) (similar
    to other frameworks).

Let's get slightly more ambitious and process some form data. This
example includes an input box. As you type in it, the contents are
echoed to a text element.

    const inputEcho = {
      controller: () => ({
        youSaid: m.prop('')
      }),
      
      view: ctrl => m('div', [
        m('input', {
          oninput: m.withAttr('value', ctrl.youSaid),
          value: ctrl.youSaid()
        }),
        ' You Said: ',
        ctrl.youSaid()
      ])  
    }

    m.mount(document.body, inputEcho);

[CodePen](https://codepen.io/mikeward/pen/RRYNqj?editors=0010)

Points of interest:

-   Components can have an optional controller.
-   The `controller` is passed to the view.
-   Virtual elements can have children.
-   Literal strings are, um, err literal strings.
-   [`m.withAttr`](http://mithriljs.org/mithril.withAttr.html) is an
    event handler factory. It returns a method that can be bound to a
    DOM element's event listener.
-   Redrawing occurs automatically for mounted components on events
    (`oninput` in this case).
-   I'm keeping state in the component to keep things simple.

The [`m.prop`](http://mithriljs.org/mithril.prop.html) function is not
required. It's a convenience function that generates a getter and
setter. Why not use JavaScript properties? There's an [explanation in
the
docs,](https://lhorie.github.io/mithril-blog/the-uniform-access-principle.html)
but in short, JavaScript properties are not implemented properly.

Another thing I'm usually interested in when investigating a new
framework is how it handles iteration. Let's take the example above and
have it split the input into an array of characters and put those
characters into a list.

    const inputEcho = {
      controller: () => ({
        youSaid: m.prop('')
      }),
      
      view: ctrl => m('div', [
        m('input', {
          oninput: m.withAttr('value', ctrl.youSaid),
          value: ctrl.youSaid()
        }),
        ' You said: ',
        ctrl.youSaid(),
        m('ul', ctrl.youSaid().split('').map(c => m('li', c)))
      ])
    }

    m.mount(document.body, inputEcho);

[CodePen](https://codepen.io/mikeward/pen/xOakAb?editors=0011)

Points of interest:

-   No special iteration constructs are required. Standard JavaScript
    works just fine.
-   JavaScript is often less verbose than markup.

Let's add a button to reset everything.

    const inputEcho = {
      controller: () => ({
        youSaid: m.prop('')
      }),
      
      view: ctrl => m('div', [
        m('button', { onclick: () => ctrl.youSaid('') }, 'Clear'),
        ' ',
        m('input', {
          oninput: m.withAttr('value', ctrl.youSaid),
          value: ctrl.youSaid()
        }),
        ' You said: ',
        m('span', ctrl.youSaid()),
        m('ul', ctrl.youSaid().split('').map(c => m('li', c)))
      ])
    }

    m.mount(document.body, inputEcho);

[CodePen](https://codepen.io/mikeward/pen/qNrbxk?editors=0011)

Points of interest:

-   Mithril does not have an eventing system. Use DOM events.

If a component has several distinct parts I like to break it up into
additional components. Let's separate the `button` control into a new
component.

    const clearButton = {
      view: ({}, args) => 
        m('button', { onclick: () => args.clickAction() }, 'Clear')  
    }

    const inputEcho = {
      controller: () => ({
        youSaid: m.prop('')
      }),
      
      view: ctrl => m('div', [
        m(clearButton, { clickAction: () => ctrl.youSaid('') }),
        ' ',
        m('input', {
          oninput: m.withAttr('value', ctrl.youSaid),
          value: ctrl.youSaid()
        }),
        ' You said: ',
        ctrl.youSaid(),
        m('ul', ctrl.youSaid().split('').map(c => m('li', c)))
      ])
    }

    m.mount(document.body, inputEcho);

[CodePen](https://codepen.io/mikeward/pen/YWOVRJ?editors=0010)

Points of interest:

-   Components can include components.
-   Properties can be passed to components.
-   Controllers also receive the same properties argument (not
    shown here).
-   Constructing new components requires little ceremony.
-   Parameterizing the `clickAction` encourages the reuse of
    `clearButton`

And when it comes to HTTP requests, Mithril has you covered as well.
Like the rest of Mithril, it's straightforward, concise and surprisingly
complete. It even supports JSONP. Here's an example from the
documentation.

    //model
    var User = {}

    User.listEven = function() {
        return m.request({method: "GET", url: "/user"}).then(function(list) {
            return list.filter(function(user) {return user.id % 2 == 0});
        });
    }

    //controller
    var controller = function() {
        return {users: User.listEven()}
    }

There's also a routing API. It does what you expect a routing API to do.
I did not test routing.

Other random things I really like about Mithril

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
