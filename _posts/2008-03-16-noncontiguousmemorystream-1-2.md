---
layout: post  
title: 'NonContiguousMemoryStream 1.2'
---
I've updated my `MemoryStream` replacement that handles large streams with less memory fragmentation. You can read about it [here](http://mike-ward.net/2008/03/09/noncontiguousmemorystream-revised). This version fixes a bug in the Seek method (specifically, `SeekOrigin.End`). I thought it should be illegal to seek past the end of a memory stream but apparently I'm wrong. The .NET `MemoryStream` allows this type of operation and so now does `NonContiguousMemoryStream`.
