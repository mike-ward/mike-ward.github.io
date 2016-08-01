---
layout: post  
title:  'Exploring Mithril, A Javascript Framework for Building Brilliant Applications'  
published: false  
...

[Mithril](http://mithriljs.org/) is a JavaScript framework for writing
web site front ends. It's similar to React but is easier to understand,
faster and much much smaller (7.8K compressed).

What's surprising is despite the "order of magnitude" smaller size, it's
a more complete solution. While React only deals with the view
component, Mithril also includes a capable router, promises and
`xmlHttpRequest` component. Just enough functionality to hit that sweet
of generating forms and making service requests without having to,
"Download the Internet."

Note: I'm assuming you have a passing familiarity with React or other
React like frameworks.

OK, so what does it look like? Assuming that `mithril.js` is already
loaded on the page:

    const helloWorld = {
      view: () => m('h1', 'Hello World')
    }

    m.mount(document.body, helloWorld);

[CodePen](https://codepen.io/mikeward/pen/pbOvZQ)

Points of interest:

-   Components are simple objects. They're not derived from a
    base class.
-   A component only needs a view the method that returns a
    virtual element.
-   Components are referred to by value (not strings).
-   There is no (official) template language. Markup is expressed in
    functions (like React)

Let's get slightly more ambitious and process some form data:

    const inputEcho = {
      controller: () => ({
        youSaid: m.prop('')
      }),
      
      view: ctrl => m('div', [
        m('input', {
          oninput: m.withAttr('value', ctrl.youSaid),
          value: ctrl.youSaid()
        }),
        m.trust(' You said: '),
        m('span', ctrl.youSaid())
      ])  
    }

    m.mount(document.body, inputEcho);

[CodePen](https://codepen.io/mikeward/pen/RRYNqj?editors=1111)

Points of interest:

-   Components can have an optional controller
-   The Controller is passed to the view
-   Virtual elements can have children
-   Use `m.trust` to put in literal, uninterpreted content.
-   Redrawing occurs automatically on events (`oninput` in this case)

The `m.prop` function is not required. It's a convenience method that
generates a getter and setter. Why not use JavaScript properties you
ask? There's a lengthy explanation in the docs, but in short, properties
are not implemented uniformly in browsers.

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
        m.trust(' You said: '),
        m('span', ctrl.youSaid()),
        m('ul', ctrl.youSaid().split('').map(c => m('li', c)))
      ])
    }

    m.mount(document.body, inputEcho);

[CodePen](https://codepen.io/mikeward/pen/xOakAb?editors=0011)

Because views are functions, we can use JavaScript iteration constructs.

Finally, let's add a button to clear everything.

    const inputEcho = {
      controller: () => ({
        youSaid: m.prop('')
      }),
      
      view: ctrl => m('div', [
        m('button', { onclick: () => ctrl.youSaid('') }, 'Clear'),
        m.trust('&nbsp;'),
        m('input', {
          oninput: m.withAttr('value', ctrl.youSaid),
          value: ctrl.youSaid()
        }),
        m.trust(' You said: '),
        m('span', ctrl.youSaid()),
        m('ul', ctrl.youSaid().split('').map(c => m('li', c)))
      ])
    }

    m.mount(document.body, inputEcho);

[CodePen](https://codepen.io/mikeward/pen/qNrbxk?editors=0011)

And when it comes to HTTP requests, Mithril has you covered as well.
Like the rest of Mitril, it's straightforward concise and surprisingly
complete. It even support JSONP. Here's an example from the
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
I did not test it since I tend to deal with routing in a different
manner.

Other random things I really like about Mithril

-   The documentation is outstanding. It's not generated from code
    comments but is instead written by hand. The author has done a great
    job explaining not only how the API's work but the motivation behind
    why it works the way it does.

-   It's fast. It most cases it's much faster than React. You can see
    the [benchmarks](http://mithriljs.org/benchmarks.html) on the
    web site. Like all benchmarks, take them with a grain a salt. My
    take away is that framework performance is not an issue.

-   The [Gitter](https://gitter.im/lhorie/mithril.js) chat group is
    helpful and friendly.

-   If you like using JSX, there's an [MSX
    tool](http://mithriljs.org/tools.html) for Mithril that does the
    same thing.

-   Views can be compiled for that last bit of performance tweaking.

-   Works great with Typescript. The library has a type definition file
    in the respository.

-   Supports ancient versions of Internet Explorer

-   A surprising number of big name sites use Mithril including Nike and
    MLB.com

Finally, I've put together a simple example of an iTunes Browser. This
is the standard little toy application I write when I explore a new
framework. It demonstrates in a bit more structured way forms
processing, table generation, micro-service requests, column sorting and
even a fun little video player.

[Mithril iTunes Browser](https://github.com/mike-ward/mithril-itunes)

![screen shot](http://i.imgur.com/KSdGCtq.png)

Yeah, you've been Rick-Rolled.
