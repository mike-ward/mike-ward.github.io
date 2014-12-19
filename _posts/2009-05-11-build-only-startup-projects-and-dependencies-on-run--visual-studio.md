---
layout: post  
title: 'Build only startup projects and dependencies on Run – Visual Studio'
---
Depending on the project, Visual Studio sometimes wants to build more than is necessary to actually debug/run the project. Sometimes even, it will continue building the other project dependencies after the debugging session has ended. Really annoying and on larger projects, a significant time waster.

Well bucko, there’s a workaround and it’s as easy as changing a setting in the options dialog.

![options](/cdn/images/blog/Buildonlystartupprojectsanddependencieso_E0B1/options.jpg)

This is for Visual Studio 2008. Not sure if there is an equivalent setting in VS 2005.
