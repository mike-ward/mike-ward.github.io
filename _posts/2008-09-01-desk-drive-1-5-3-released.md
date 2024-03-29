---
layout: post  
title: 'Desk Drive 1.5.3 Released'
---
[Desk Drive](/deskdrive) 1.5.3 introduces two new languages, Galician and Spanish. I've also added a hook into the windows notification mechanism which sends Desk Drive a notification when new media is inserted or removed. This allows the program to detect new drives faster. Several corrections to translations were added as well. Finally, I've eliminated the generated COM interops in favor of internal code.

All this is fairly techy-geeky stuff. Bottom line is 1.5.3. is smaller, faster and more portable.

Several of you have asked for a portable (mobile) version of Desk Drive that can be used from a USB stick. As of 1.5.3, the only required component is the `DeskDrive.exe` binary. The `BigManStuff.LocusEffects.dll` is a third party library that handles the positional effects. It's optional and the program can continue to operate in its absence. Of course there will be no positional effect. The `DeskDrive.exe.xml` file that contains the translation strings is also optional. Desk Drive will fallback to displaying English when it can't find a translation file.

Donations. To date I've received a grand total of zero. That's pretty sad considering I've tracked 100,000 downloads since May. And that number does not include the many Freeware/Shareware sites that host downloads. It doesn't have to be a princely sum. A couple of dollars from even 10% of you would make for a nice dividend. And yes, I eat my own dog food here. My most recent donation was to [Launchy](http://www.launchy.net/), which is a fabulous program launcher.

I'm looking for more suggestions on improvements to Desk Drive. I'm considering adding more positional effects. Ideas for different effects are welcome. Another fine suggestion came from a user asking if Desk Drive could open the Windows explorer for the detected device. Finally, if you're artistically inclined (I'm certainly not), artwork to make the program more attractive would be very helpful. I could really use a logo for Desk Drive at the very least.
