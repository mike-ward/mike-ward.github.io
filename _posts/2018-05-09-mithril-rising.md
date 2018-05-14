---
layout: post  
title:  'Mithril Rising'  
published: true
...

This is a follow up to a post a wrote last year about Mithril v0.24. It
has since been updated to a v1.0 release. There are a number of small
changes and some awesome new stuff so I'm rewriting and extending my
earlier post.

[Mithril](http://mithriljs.org/) is a JavaScript framework for writing
web site front ends. It's similar to React but is easier to understand,
faster and much much smaller (8K compressed).

What's surprising is despite its tiny size, it's a more potent solution
than React. It uses a virtual DOM differencing implementation for
performant rendering, utilities for high-level modeling via functional
composition, support for routing, HTTP requests and componentization.
Just enough functionality to hit that sweet of generating forms and
making service requests without having to, "Download the Internet."

> *Note: I'm assuming you have a passing familiarity with React or other
> React like frameworks.*

OK, so what does it look like? Assuming that `mithril.js` is already
loaded on the page:

<script src="https://flems.io/flems.html" type="text/javascript" charset="utf-8"></script>
<script>
function Example(id, code, css) {
  Flems(document.getElementById(id), {
    files: [
      {
        name: '.js',
        content: code
      },
      {
        name: '.css',
        content: css || ''
      }
    ],
    links: [
      {
        name: 'mithril',
        type: 'script',
        url: 'https://unpkg.com/mithril'
      },
      {
        name: 'mithril-stream',
        type: 'script',
        url: 'https://unpkg.com/mithril-stream'
      },
      {
        name: 'purecss',
        type: 'css',
        url: 'https://unpkg.com/purecss'
      }
    ],
    middle        : 55,
    selected      : '.js',
    color         : 'rgb(38,50,56)',
    theme         : 'material',
    resizeable    : true,
    editable      : true,
    toolbar       : true,
    fileTabs      : true,
    linkTabs      : true,
    shareButton   : true,
    reloadButton  : true,
    console       : true,
    autoReload    : true,
    autoHeight    : false,
  })
}
</script>
<div id="hello1" style="height: 15em; border: 1px solid lightgray; margin-bottom: 1em"></div>
<script>
  Example('hello1', [
  "m.render(document.body, m('h1', 'Hello world'))",
  ].join('\n'))
</script>
Points of Interest:

-   The [`m()`](https://mithril.js.org/hyperscript.html) function
    generates a [`vnodes`](https://mithril.js.org/vnodes.html). Vnodes
    are virtual DOM objects that Mithril uses to build and update the
    Web page.
-   [`m.render()`](https://mithril.js.org/render.html) is a low-level
    function. Typically you use the
    [m.mount()](https://mithril.js.org/mount.html) as you'll see in the
    next example.
-   Text `vnodes` can be expressed as a simple string. Try replacing
    `m('h1', 'Hello world')` with `'Hello World'` above (examples are
    editable!)

Points of interest:

A one-line "Hello World" program is fun but are hardly illustrative of
Mithril capabilities. Here's a more canonical example with, "Hello
World" as a component.

<div id="hello2" style="height: 15em; border: 1px solid lightgray; margin-bottom: 1em"></div>
<script>Example('hello2', [
"const helloWorld = {",
"  view: () => m('h1', 'Hello World')",
"}",
"",
"m.mount(document.body, helloWorld);",
].join('\n'))
</script>
Points of interest:

-   A JavaScript object only needs a `view` method that returns a
    *vnode* to be recognized as a component.
-   Components are dead-simple JavaScript objects. They're not inherited
    from a base class or otherwise encumbered.
-   Components are loaded via
    [`m.mount()`](http://mithril.js.org/mount.html) (similar to other
    frameworks).
-   Components that are *mounted* will be redrawn automatically by the
    framework after DOM events are triggred.
-   Components can have life-cycle methods (similar to Reach).
-   There's very little boiler plate required to bootstrap a Mithril
    application.

Let's get slightly more ambitious and process some form data. This
example extends our component to include an input box. As you type in
the input box, the contents are echoed to the Web page.

<div id="yousaid1" style="height: 30em; border: 1px solid lightgray; margin-bottom: 1em"></div>
<script>
  Example('yousaid1', [
    "let youSaid = '123'",
    "",
    "const helloWorld = {",
    "  view: () => m('div', [",
    "    m('h1', 'Hello World'),",
    "    m('input', {",
    "      value: youSaid,",
    "      oninput: e => youSaid = e.target.value",
    "    }),",
    "    ' You said: ' + youSaid",
    "  ])",
    "}",
    "",
    "m.mount(document.body, helloWorld);"
  ].join('\n'))
</script>
Points of interest:

-   *Vnodes* can have children. Child elements are expressed as an array
    or comma separated list of parameters.
-   **Try it**: Remove the square brackes brackets from lines 4 and 11.
-   Text nodes are expressed as strings.
-   There is no two-way binding. Components simply reflect the state of
    the model.
-   Mithril does not have an eventing system. Use DOM events.
-   Redrawing occurs automatically for mounted components on events
    (`oninput` in this case).
-   For the sake of brevity I'm using a simple global data model,
    `youSaid`.

Next, let's look at how Mithril handles iteration. We'll take the
example above and split the input into an array of characters and render
it as an unordered list.

<div id="yousaid2" style="height: 45em; border: 1px solid lightgray; margin-bottom: 1em"></div>
<script>
  Example('yousaid2', [
    "let youSaid = '123';",
    "",
    "const helloWorld = {",
    "  view: () => m('div',",
    "    m('h1', 'Hello World'),",
    "    m('input', {",
    "      value: youSaid,",
    "      oninput: e => youSaid = e.target.value",
    "    }),",
    "    ' You said: ' + youSaid)",
    "}",
    "",
    "const listEcho = {",
    "  view: () =>  m('ul',", 
    "    youSaid.split('').map(c => m('li', c))",
    "  )",
    "}",
    "",
    "const app = {",
    "  view: () => m('div',",
    "    m(helloWorld),",
    "    m(listEcho))",
    "}",
    "",
    "m.mount(document.body, app);"
].join('\n'))
</script>
Points of interest:

-   No special iteration constructs are required. Standard JavaScript
    works just fine.
-   JavaScript is often less verbose than markup.
-   Mithril naturally lends itself to building components by
    composition.

Let's add a button to reset the model (`youSaid`).

<div id="yousaid3" style="height: 65em; border: 1px solid lightgray; margin-bottom: 1em"></div>
<script>
  Example('yousaid3', [
    "let youSaid = '123';",
    "",
    "const helloWorld = { view: () =>",
    "  m('h1', 'Hello World')",
    "}",
    "",
    "const resetButton = {",
    "  view: () => m('button', ",
    "    { onclick: () => youSaid = '' },", 
    "    'Reset')",
    "}",
    "",
    "const inputEcho = {",
    "  view: () => m('div',",
    "    m(resetButton),",
    "    m('input', {",
    "      value: youSaid,",
    "      oninput: e => youSaid = e.target.value",
    "    }),",
    "    ' You said: ' + youSaid)",
    "}",
    "",
    "const listEcho = {",
    "  view: () =>  m('ul', ",
    "    youSaid.split('').map(c => m('li', c))",
    "  )",
    "}",
    "",
    "const app = {",
    "  view: () => m('div',",
    "    m(helloWorld),",
    "    m(inputEcho),",
    "    m(listEcho))",
    "}",
    "",
    "m.mount(document.body, app);"
  ].join('\n'))
</script>
Points of interest:

-   Moved the `input` functionality into a new component. `helloWorld`
    was doing too many things.
-   Mithril's low-ceremony components promote small, consise components.
-   More complex components are a composition of other components.

In the next example, I want to remove the global references to the
`youSaid` model. Instead, I'll pass the model down to the components
through Mithril's vnode object.

<div id="yousaid6" style="height: 55em; border: 1px solid lightgray; margin-bottom: 1em"></div>
<script>
  Example('yousaid6', [
    "const helloWorld = { view: () =>",
    "  m('h1', 'Hello World')",
    "}",
    "",
    "const resetButton = {",
    "  view: v => m('button', ",
    "    { onclick: () => v.attrs.model('') },", 
    "    'Reset')",
    "}",
    "",
    "const inputEcho = {",
    "  view: v => m('div',",
    "    m(resetButton, { model: v.attrs.model }),",
    "    m('input', {",
    "      value: v.attrs.model(),",
    "      oninput: e => v.attrs.model(e.target.value)",
    "    }),",
    "    ' You said: ' + v.attrs.model())",
    "}",
    "",
    "const listEcho = {",
    "  view: v =>  m('ul', ",
    "    v.attrs.model().split('').map(c => m('li', c))",
    "  )",
    "}",
    "",
    "const app = mdl => ({",
    "  view: () => m('div',",
    "    m(helloWorld),",
    "    m(inputEcho, { model: mdl }),",
    "    m(listEcho, { model: mdl }))",
    "})",
    "",
    "m.mount(document.body, app(m.stream('123')));",
  ].join('\n'))
</script>
Points of interest:

-   The `view` method takes one parameter, a reference to its `vnode`.
-   `vnode.attrs` contains any attributes attached to the component.
-   `vnode` has other useful fields including `state`, which persists
-   across redraws.
-   Mithril includes a functional stream library (e.g.
    `m.stream('123')`. In this example I'm using it as a simple
    *getter/setter*. Streams are powerful, reactive objects (think
    computed properties on steroids for instance).
-   Streams are not required in Mithril (or this example), but they're
    so darn useful, I couldn't resist using them.

And just to drive the point home about the expressiveness of writing
your markup in JavaScript, check out the `app` component in the next
example.

<div id="yousaid7" style="height: 55em; border: 1px solid lightgray; margin-bottom: 1em"></div>
<script>
  Example('yousaid7', [
    "const helloWorld = { view: () =>",
    "  m('h1', 'Hello World')",
    "}",
    "",
    "const resetButton = {",
    "  view: v => m('button', ",
    "    { onclick: () => v.attrs.model('') },", 
    "    'Reset')",
    "}",
    "",
    "const inputEcho = {",
    "  view: v => m('div',",
    "    m(resetButton, { model: v.attrs.model }),",
    "    m('input', {",
    "      value: v.attrs.model(),",
    "      oninput: e => v.attrs.model(e.target.value)",
    "    }),",
    "    ' You said: ' + v.attrs.model())",
    "}",
    "",
    "const listEcho = {",
    "  view: v =>  m('ul', ",
    "    v.attrs.model().split('').map(c => m('li', c))",
    "  )",
    "}",
    "",
    "const app = mdl => ({",
    "  view: () => m('div', [helloWorld, inputEcho, listEcho]",
    "    .map(c => m(c, { model: mdl })))",
    "})",
    "",
    "m.mount(document.body, app(m.stream('123')));"
  ].join('\n'))
</script>
Other random things I really like about Mithril

-   Mithril has a concise high-level utility for working with web
    services called [`m.request`](https://mithril.js.org/request.html).
    It even supports JSONP.

-   It also contains a routing system
    ([`m.route()`](https://mithril.js.org/route.html)) to help create
    Single Page Applications (SPA).

-   There's a simple but effective promise system to handle asynchrony.

-   The documentation is outstanding. It's written by hand, not
    generated from code. The author has done a great job explaining how
    the API's work and the motivation behind why it works as it does.

-   It's performant. It many cases it's faster than React. [Repaint Rate
    Challenge](https://mathieuancelin.github.io/js-repaint-perfs/) also
    has some interesting benchmarks. Like all benchmarks, take them with
    a grain a salt. My take away is that framework performance is on as
    good or better than the big 3 (Angular, React, Vue).

-   The [Gitter](https://gitter.im/lhorie/mithril.js) chat group is
    helpful and friendly.

-   You can use JSX if you like. I'm not a JSX fan because I find
    Mithril's hypertext functionallity is more expressive. JSX can be
    handled in Babel, Webpack, Parcel, etc.

-   Works great with Typescript. Mithril has a type definitions at
    [npmjs.org](https://www.npmjs.com/package/@types/mithril).

-   Supports ancient versions of Internet Explorer (with additional
    work)

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
processing, table generation, micro-service requests.

<div id="iTunes" style="height: 120em; border: 1px solid lightgray; margin-bottom: 1em"></div>
<script>
  Example('iTunes', [
    "const model = {",
    "  query: '',",
    "  tracks: [],",
    "  }",
    "",
    "const actions = ({",
    "  setQuery: q => ",
    "    model.query = q,",
    "",
    "  search: () => ", 
    "    m.request({",
    "      dataType: 'jsonp',",
    "      url: 'https://itunes.apple.com/search',",
    "      data: { term: model.query, media: 'musicVideo' }",
    "    })",
    "    .then(data => { model.tracks = data.results })",
    "  })",
    "",
    "const title = {",
    "  view: () => m('h2', 'iTunes Sampler')",
    "  }",
    "",
    "const findForm = {",
    "  view: () => m('.pure-form', ",
    "    m('input.pure-input-rounded', {",
    "      oninput: m.withAttr('value', actions.setQuery), ",
    "      value: model.query }),",
    "    m('button.pure-button', { onclick: actions.search }, 'Search')",
    "    )",
    "  }",
    "",
    "const headerRow = () => ",
    "  m('tr', [ ",
    "    ['Track', 'Artist', 'Price'].map(h => m('th', h)) ",
    "  ])",
    "",
    "const trackRows = tracks => ",
    "  tracks.map(track => m('tr', [",
    "    m('td', m('img', {src: track.artworkUrl100}), track.trackName),",
    "    m('td', track.artistName),",
    "    m('td', track.trackPrice)",
    "  ]))",
    "",
    "const tracksList = {",
    "  view: () => ",
    "    m('table.pure-table.trackslist', ",
    "      m('thead', [ headerRow() ]),",
    "      m('tbody', [ trackRows(model.tracks) ])",
    "    )",
    "  }",
    "",
    "const iTunes = {",
    "  oninit: () => { ",
    "    actions.setQuery('Rick Astley');",
    "    actions.search()",
    "  },",
    "",
    "  view: () => m('div',",
    "    m(title),",
    "    m(findForm),",
    "    m(tracksList)",
    "    )",
    "  }",
    "",
    "m.mount(document.body, iTunes);"
  ].join('\n'),
  [
    "html { margin: 2em; }",
    ".trackslist { margin-top: 2em; }",
    ".pure-button { margin-left: 1em; }",
    "h2 { text-align: center}",
    "img { margin-right: 1em; float: left; }"
  ].join('\n'))
</script>
Yep, you've just been “Rick Rolled”.

### About [FLEMS.IO](https://flems.io)

Flems is a playground for web development. It's ideal for prototyping
ideas & sharing working front-end code examples. It's written in
Mithril.

Unlike other playgrounds, Flems doesn't require a connection to the
server after page load: all the code you write in a Flems is computed in
the browser and saved as a compressed string in the URL. The only thing
you need a connection for is downloading extra dependencies. This means
you can type away without needing to 'save' a Flems and the URL in the
location bar will always be a shareable link to exactly what you're
seeing.

Every Flems starts with an HTML, JS and CSS file, but you can add more
files - Flems supports TypeScript, LiveScript and Babel (standalone)
compilation too. You can add CSS & JS dependencies by specifying a full
URL pointing to the desired file, or by giving a reference to an NPM
package (and optional path) - these will be taken from `unpkg.com`. You
can change file execution for any given file or dependency of the same
type by hovering over it in the sidebar and using the up & down arrows.

Flems.io is based on the Open Source [Flems
module](https://github.com/porsager/flems) which you can use for easy
self hosting or embedding.
