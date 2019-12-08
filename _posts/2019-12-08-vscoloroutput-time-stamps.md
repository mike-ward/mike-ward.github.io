---
layout: post  
title: 'VSColorOutput 2.7 - Time Stamps'
---

Thanks to a pull request, the long standing problem of losing sytnax highlighting after saving the output buffer to a file is fixed ([#103](<https://github.com/mike-ward/VSColorOutput/pull/103>)). This took some presistence to fix because the issue involved a bug (maybe) in Visual Studio. Thanks go out to <https://github.com/Dmitry-Me>.

I added a new feature; User specified time stamp specifiers. Issue [#47](https://github.com/mike-ward/VSColorOutput/issues/47) complained about VSColorOutput not working with another plugin that added time stamps to the output. But reading between the lines, what was wanted was a way to specify the format the timestamps in VSColorOutput. 

Since I was already in the code adding the pull request I figured, why not? It won't take long to implement (it did).

There are two parts to the time stamp. The first part is the elapsed time from the beginning of the debugging session. The second part is the incremental time from the previous time stamp. Both are configurable.

![Clipboard](https://i.imgur.com/IZLIcs3.png)

Do keep in mind the time formatting specifiers are .Net `TimeSpan` specifiers, not `DateTime`. They're different (which was news to me). Here's an example:

`mm':'ss':'fff`

Issue [#100](https://github.com/mike-ward/VSColorOutput/issues/100) removes the  `(hh:mm:ss.fff)` portion of the time stamp.

Added a new pattern to handle Azure build/publish output ([#60](https://github.com/mike-ward/VSColorOutput/issues/60)).

Get it at [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=MikeWard-AnnArbor.VSColorOutput).