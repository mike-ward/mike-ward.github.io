---
layout: post  
title:  "Quick ReSharper tip for inline templates"  
...

I just discovered a nifty little feature of ReSharper that makes inline template editing much nicer.

    function hcvdGridDirective($http): ng.IDirective {
      // language=html
      const template = `
        <div>
          <grid-ex grid-options="ctrl.gridOptions"></grid-ex>
        </div>`;

The addition of `// language=html` enhances inline template editing considerably by instructing ReSharper to add syntax highlighting and some basic command completion.

![screen shot of syntax highlighting](http://i.imgur.com/daY7zvY.png)

I prefer inline templates to of placing them in a separate file. This parallels other frameworks like React, Riot, Mithril, etc. where markup is expressed with the control logic.
