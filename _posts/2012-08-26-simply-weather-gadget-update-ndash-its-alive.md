---
layout: post
title: 'Simply Weather Gadget Update &ndash; It''s Alive!'
---
Simply Weather stopped working this weekend and it's because Google has killed their weather API. I've changed Simply Weather to use Microsoft's MSN weather API. The MSN API does not have as many features as the Google API but it's the only free API remaining that supports 3 day forecasts. You can get the updated gadget from the [downloads page](/downloads).

The Google API automatically resolved locations. This eliminated the step of asking for a unique location identifier. MSN's API requires a location identifier. This required adding a "Find" button to the settings dialog. Enter your location. US zip codes work of course. For non-US locations, a "city, country" specification is usually enough. Click "Find" and you should see a "drop-down" box with the location. There may be several choices if the specification is ambiguous (Victoria, Canada returns 3 locations for instance).

The Google API also provided translations to 80 different languages. It's not supported in the MSN API. That's an unfortunate loss.

I've taken this opportunity to update the gadget in other areas.

  * You can customize the background/foreground colors. I found I have a talent for creating some ugly combinations.
  * Created tool tips that work regardless of focus.
  * Added "Feels like" temperature (hover over Temperature)
  * Chance of precipitation is indicated in the forecast condition when greater than 0%

![FeelsLike](/cdn/images/blog/Simply-Weather-Gadget-Update--Its-Alive_A9EA/FeelsLike.png) ![precip](/cdn/images/blog/Simply-Weather-Gadget-Update--Its-Alive_A9EA/precip.png) ![](/cdn/images/blog/Simply-Weather-Gadget-Update_7A07/color2.png)

Weather alerts are not working yet. I've got a plan on how I might get these alerts but it will only be for the US. The Weather Underground's API for alerts is going to a paid subscription model. The only other available source is the National Weather Service.

The loss of translations and other international features is real loss. It was a unique offering and allowed the gadget to serve a much larger community. 

I'll post a follow-up once I have weather alerts back online.
