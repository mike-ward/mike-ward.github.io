---
layout: post  
title: 'Calculator Sidebar Gadget Released'
---
Yes, just what the world needs, another calculator gadget! Except this is actually a useful and usable calculator gadget. You don't get pretty buttons or bubble gum skins. Instead, you get a calculator that evaluates expressions and remembers what you enter for later use. Like my Stopwatch gadget, it's no frills and to the point. Here's a screen shot.

![](/cdn/images/blog/CalculatorSidebarGadgetReleased_10BE6/image.png)

Like I said, not the most exciting interface, but what it lacks in style it makes up for in usefulness. The settings dialog gives you a good idea of how to use it.

![](/cdn/images/blog/CalculatorSidebarGadgetReleased_10BE6/image_3.png)

There are other shortcuts as well. For instance you can enter

0x20[enter]

and it converts it to decimal (32).

What I find it useful for is adding up long lists of numbers like:

10+12+24+17+4+30+11[enter]

Now of course you can do this with other calculators but you enter operations one at a time. If you lose track of where you are in the sequence, which I invariable do, you have to start over. With my calculator, you can see the whole sequence.

The recall stack remembers what's in the calculator every time you press enter. Use the up/down arrow keys to recall the previous values. Pressing enter always enters values at the top of the stack.

The calculator sports two sizes. In the docked position, it's 130 pixels wide. Undocked it's 260 pixels wide which gives you a bit more room for seeing longer expressions.

The effort to do all this was minimal. I let the JavaScript engine do all the work by using the `eval()` statement. The only real trick was the recall stack which is not much more than array and an integer. 

Alright, it's not going to set the world on fire but for an evenings doodling it's actually quite useful. You can get it from the [downloads](/downloads) page. Vista only.
