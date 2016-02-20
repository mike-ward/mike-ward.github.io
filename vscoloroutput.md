---
layout: page
---
![noborder](/cdn/images/vscoloroutput/vscoloroutputlogo.png)

A Visual Studio extension to colorize your build and debug output

> Not only is this extension a must install for me and all the people in
> my dev dept, stop on first error has save countless hours of our
> development time with our large projects, one of which has over 90
> projects.
>
> Mitch Ferrer  
> Application Architect  
> AppRiver LLC

What is it?
-----------

VSColorOutput can change the color of a line emitted to the output
window based on specified rules. The rules consist of regular
expressions. Rules map to classifications which in turn map to colors.

The default patterns will color build errors in red, warnings in
yellow/gold and successful build messages in green.

![screen shot of VSColorOutput build
output](/cdn/images/vscoloroutput/vscoloroutput.png)

Installation
------------

Download and open the VSColorOutput.visx file. To uninstall, go the
Tools|Extensions page, find VSColorOutput in the "Installed Extensions"
and click uninstall.

[Visual Studio Gallery download
link](https://visualstudiogallery.msdn.microsoft.com/f4d9c2b5-d6d7-4543-a7a5-2d7ebabc2496)

How does it work?
-----------------

VSColorOutput hooks into the the classifier chain of Visual Studio. This
allows VSColorOutput to monitor every line sent to the output window. A
list of classifiers, consisting of regular expressions and
classifications is checked. The first matching expression determines the
classification. If no patterns match, then line is classified as
**BuildText**.

From here, Visual Studio does the heavy lifting of mapping the
classification to a color. Settings are stored in a separate file
(`%AppData%/VSColorOutput/vscoloroutput.json`).

Usage
-----

I originally wrote VSColorOutput to highlight trace output while
debugging. It's still the primary reason I use it. I discovered it also
highlighted lines in the build window as well. I found this made it much
easier to visually parse the output and quickly locate items of
interest.

Colors are set in the `Tools|Options|VSColorOutput` dialog.

![screen shot of VSColorOutput colors
dialog](/cdn/images/vscoloroutput/vscoloroutputcolors.png)

The names reflect their intended use but are arbitrary in actual use.

Build Text is the default classification for any line that does not
match the other patterns. Its default color is "Gray". I've found this
helps to highlight the other classified lines.

Creating Patterns
-----------------

The `Tools|Options|VSColorOutput` dialog contains settings. You can add,
delete or edit the patterns. Patterns are regular expressions. The
regular expressions use the .NET form
<http://msdn.microsoft.com/en-us/library/hs600312.aspx>, which varies
slightly from those used by Ruby, JavaScript, Python, etc.

![screen shot of VSColorOutput patterns
dialog](/cdn/images/vscoloroutput/vscoloroutputpatterns.png)

At run-time, VSColorOutput will walk this list in order, testing the
line of text against the regular expression. If it matches, the line is
given the classification associated with the pattern. No additional
patterns are tested for the given line. Therefore, the order of the
classifiers is significant.

Other Features
--------------

-   **Stop Build On First Error**  
    Pretty much does what it says. A real time saver on larger projects.

-   **Show Elapsed Build Time**  
    If you build from the command line, MSBuild tells you how long the
    build takes. Building within Visual Studio does not. Why?
    Don't know. It's always bugged me so I fixed it.

-   **Show Debug Window when Debug Starts**  
    Visual Studio has a "Show Build Window when Build Starts". Now you
    have one for the debug session. If you run your debugger output in a
    tiled window, this won't have much affect. If you run it in a tabbed
    window (like I do) then this setting will activate the debug window
    saving you a few mouse clicks.

-   **Settings stored in separate file**  
    Stored in `%AppData%/VSColorOutput/vscoloroutput.json`. Share them
    with friends and family (and other developers too).

Open Source
-----------

VSColorOutput is open source. It's hosted on GitHub at
[GitHub](https://github.com/mike-ward/VSColorOutput)

<a href="https://github.com/mike-ward/VSColorOutput">
<img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"></a>
