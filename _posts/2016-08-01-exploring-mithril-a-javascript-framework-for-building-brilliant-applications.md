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

The other thing I'm usually interest when investigating a new framework is how it handles iteration.