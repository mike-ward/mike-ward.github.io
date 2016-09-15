---
layout: page
...

<p style="text-align: center">
  <img src="http://mike-ward.net/cdn/images/vscoloroutput/vscoloroutputlogo.png"
     alt="logo"
     style="border: none">
</p>

A Visual Studio extension to colorize your build and debug output

> Not only is this extension a must install for me and all the people in
> my dev dept, stop on first error has save countless hours of our
> development time with our large projects, one of which has over 90
> projects.
>
> Mitch Ferrer  
> Application Architect  
> AppRiver LLC

### What is it?

VSColorOutput can change the color of a line emitted to the output
window based on specified rules. The rules consist of regular
expressions. Rules map to classifications which in turn map to colors.

![Screen shot of build output](http://i.imgur.com/NhH0tMZ.png)

The default patterns will color build errors in red, warnings in
yellow/gold and successful build messages in green.

Like what I'm doing? Why not [donate](http://mike-ward.net/donate/)?

### Installation

Download and open the VsColorOutput.visx file. VSColorOutput supports
Visual Studio 2010/2011. You can also install it from the [Visual Studio
Extension
Gallery](http://visualstudiogallery.msdn.microsoft.com/f4d9c2b5-d6d7-4543-a7a5-2d7ebabc2496).
To uninstall, go the `Tools|Extensions` page, find VSColorOutput in the
"Installed Extensions" and click uninstall. The settings file is not
removed.

**Note: Requires .NET 4.5.2**

### How does it work?

VSColorOutput hooks into the classifier chain of Visual Studio. This
allows VSColorOutput to monitor every line sent to the output window. A
list of classifiers, consisting of regular expressions and
classifications is checked. The first matching expression determines the
classification. If no patterns match, then the line is classified as
`Build Text`.

From here, Visual Studio does the heavy lifting of mapping the
classification to a color. Settings are stored in a separate file
(`%AppData%/VSColorOutput/vscoloroutput.json`).

### Usage

I originally wrote VSColorOutput to highlight trace output while
debugging. It's still the primary reason I use it. I discovered it also
highlighted lines in the build window as well. I found this made it much
easier to visually parse the output and quickly locate items of
interest.

Colors are set in the `Tools|Options|VSColorOutput` dialog.

![screen shot of settings dialog](http://i.imgur.com/ESDQ17x.png?1)

The names reflect their intended use but are arbitrary in actual use.

`Build Text` is the default classification for any line that does not
match the other patterns. Its default color is "Gray". I've found this
helps to highlight the other classified lines.

### Creating Patterns

The RegExClassification Collection Editor dialog contains the
classification pattern settings. It can be opened via
`Tools|Options|VSColorOutput|General|RegEx Patterns`.

![screen
shot](http://mike-ward.net/cdn/images/vscoloroutput/vscoloroutputpatterns.png)

You can add, delete or edit the patterns. Patterns are regular
expressions. The regular expressions use the .NET form
(<http://msdn.microsoft.com/en-us/library/hs600312.aspx>), which varies
slightly from those used by Ruby, JavaScript, Python, etc.

At run-time, VSColorOutput will walk this list in order, testing the
line of text against the regular expression. If it matches, the line is
given the classification associated with the pattern. No additional
patterns are tested for the given line. Therefore, the order of the
classifiers is significant.

### Color Output in the Find Results Window

As 1.4, the Find Results Window is color highlighted. Two additional
color settings control the color of the output:

-   Find Results Filename
-   Find Results Search Term

![find results screen shot](http://i.imgur.com/8avU2Rv.png)

### Time Stamps

As of 2.2.1 you can optionally show timestamps in your output.

![output with time
stamps](https://cloud.githubusercontent.com/assets/567927/12311797/b3970fe6-ba27-11e5-999b-b1de37ad5003.png)

### Other Features

#### Stop Build On First Error

Pretty much does what it says. A real time saver on larger projects.

#### Show Elapsed Build Time

If you build from the command line, MSBuild tells you how long the build
takes. Building within Visual Studio does not. Why? Don't know. It's
always bugged me so I fixed it.

#### Show Debug Window when Debug Starts

Visual Studio has a "Show Build Window when Build Starts". Now you have
one for the debug session. If you run your debugger output in a tiled
window, this won't have much effect. If you run it in a tabbed window
(like I do) then this setting will activate the debug window saving you
a few mouse clicks.

#### Settings Stored in Separate File

Stored in `%AppData%/VSColorOutput/vscoloroutput.json`. Share them with
friends and family (and other developers too).

### Open Source

VSColorOutput is [open
source](https://github.com/mike-ward/VSColorOutput) and MIT licensed.
