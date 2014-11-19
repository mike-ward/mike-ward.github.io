---
layout: post
title: 'PRE/CODE/TT Fonts too small in Firefox'
---
Have you noticed how much smaller the `monospaced` fonts are in Firefox for the &lt;pre&gt;, &lt;code&gt;, &lt;tt&gt;, &lt;samp&gt; and &lt;kbd&gt; tags? There also a bit small in Opera. As far as I can tell this is a bug. There are some articles that try to explain why this rendering is correct but I don't buy it. It just plain looks wrong in my opinion. Fortunately, there's an easy fix for this using style sheets. Add the following to a style sheet:

    pre, code, samp, kbd, tt   
    {  
        font-family: "Courier New" , monospace;  
        font-size: 100%;  
        font-style: normal;  
        line-height: normal;  
    }

I've found this to get much more consistent results in IE7, Firefox and Opera.
