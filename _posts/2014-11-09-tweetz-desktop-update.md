---
layout: post  
title: "Tweetz Desktop Update"
---
It's been a while since Tweetz Desktop has seen any love. So many projects, so little time...

Release Notes:

- Recovery mechanism for corrupted configuration files.
- Saved window location algorithm uses `WindowPlacement` API to handle edge cases like missing second monitor and resolution changes.
- Update run-time to .NET 4.5.2

I've been unable to determine why the user configuration files get corrupted. It's rare but it does happen. Since it can happen, I've added code to detect the corrupted file and delete it. Not the most elegant approach but the only one I can get to reliably work.

Occasionally, I get reports about the Window not showing because it was on a second monitor that is no longer attached to the system. This is a relatively hard problem to fix correctly. Fortunately, there's a Windows API that helps in resolving these edge cases.

Believe it or not, [.NET 4.5.1 is end-of-life as of January 2016](http://blogs.msdn.com/b/dotnet/archive/2014/08/07/moving-to-the-net-framework-4-5-2.aspx).

Available on the [downloads page](http://mike-ward.net/downloads).