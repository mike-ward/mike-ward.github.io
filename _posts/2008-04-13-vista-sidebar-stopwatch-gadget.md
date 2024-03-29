---
layout: post  
title: 'Vista Sidebar Stopwatch Gadget'
---
[Vista has gadgets](http://vista.gallery.microsoft.com/vista/SideBar.aspx?mkt=en-us) similar to what is found on the [Mac](http://www.apple.com/downloads/dashboard/) and in [Yahoo Widgets](http://widgets.yahoo.com/) (formerly Konfabulator). For some reason, they have not been well received which (again) is a bit puzzling to me since they work quite well and are easy to author. The quality of a gadgets themselves is not always up to par with their Mac and Yahoo counterparts but that's not a limitation of the platform. My favorite gadgets are the [NPR Listener](http://gallery.live.com/liveItemDetail.aspx?li=d99b643d-e05c-48e2-a5b4-030d4d5e5d6b&bt=1&pl=1), [AdSense Monitor](http://gallery.live.com/liveItemDetail.aspx?li=3fd2ed33-77fa-46d8-b60e-85f1839be2a1&bt=1) and [Wireless Status Meter](http://gallery.live.com/liveItemDetail.aspx?li=35393b6e-5e43-45ff-95dd-49cfc4303246&bt=1). 

Gadgets are really easy to write. There's no compilation and the installation is as simple as placing the files in a special folder. To illustrate the point, I wrote a simple stopwatch gadget. The gadget is simplicity itself. Click to start, click to stop, double-click to reset. No buttons or countdowns or lap times. Nothing to confuse a user like myself.

I put together a mini tutorial for experienced programmers who are familiar with HTML, XML, JavaScript and just a smidgen of Document Object Model (DOM) with some notes on some pitfalls I encountered along the way.

First off the requirements.

  * Gadgets are special folders containing a Gadget.xml file referred to as the manifest, plus supporting HTML, JavaScript and image files. 
  * The Gadget special folders are located in:

    %USERPROFILE%\AppData\Local\Microsoft\Windows Sidebar\Gadgets (for user gadgets)   
    %SYSTEM_ROOT%\Program Files\Windows Sidebar\Gadgets (for global gadgets)

  * The folder name must have the extension of ".gadget". 

That's really all there is to it. Now for the files. The Gadget.xml file contains a description of the gadget. Here's the one for Stopwatch.
    
    <xml version="1.0" encoding="utf-8"?>
    <gadget>
      <name>Stopwatch</name>
      <version>1.0.0.0</version>
      <author name="Blue Onion Software">
        <info url="http://mike-ward.net" />
        <logo src="logo.png" />
      <author>
      <copyright>© 2008</copyright>
      <description>Simply a stopwatch</description>
      <icons>
        <icon src="logo.png" />
      </icons>
      <hosts>
        <host name="sidebar">
          <base type="HTML" apiVersion="1.0.0" src="stopwatch.html" />
          <permissions>Full</permissions>
          <platform minPlatformVersion="1.0" />
        </host>
      </hosts>
    </gadget>

The details are obvious. You'll need to name your gadget, point to an image file (optional), and indicate the name of the HTML file that contains the actual gadget code. Here's an image of how the manifest parts map to the Gadget Gallery.

![](http://msdn2.microsoft.com/en-us/library/Aa965879.GadgetPicker_with_callouts%28en-us,VS.85%29.png)

The "stopwatch.html" file is also straightforward. It's just an HTML file containing the layout of the gadget. The JavaScript is small enough for this gadget to directly embed into the web page. External style sheets and script files are supported if you prefer.
    
    <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=Unicode" />
      <title>Stopwatch</title>
      <style type="text/css">
        body { width: 130; height: 67; margin: 0; }
        div { padding-top: 16px; padding-left: 10px; color: Lime; font-family: Segoe Condensed; font-size: 30px; }
      </style>
      <script type="text/javascript">
          System.Gadget.settingsUI = "stopwatchsettings.html";
          intervalId = 0;
          running = false;
          start = 0;
    
          function onreset()
          {
            clearInterval(intervalId);
            start = 0;
            running = false;
            watch.firstChild.nodeValue = "00:00:00.0";
          }
          
          function onstartstop()
          {
            if (running)
            {
              clearInterval(intervalId);
              running = false;
            }
            else
            { 
              if (start <= 0) start = (new Date).getTime();
              intervalId = setInterval("ticker()", 50);
              running = true;
            }
          }
    
          function ticker()
          {
            now = (new Date).getTime() - start;
            hour = Math.floor((now / 3600000) % 24);
            min = Math.floor((now / 60000) % 60);
            sec = Math.floor((now / 1000) % 60);
            tenths = Math.floor((now / 100) % 10);
            if (min <= 9)  min = "0" + min;
            if (sec <= 9)  sec = "0" + sec;
            if (hour < 10) hour = "0" + hour;
            watch.firstChild.nodeValue = hour + ":" + min + ":" + sec + "." + tenths;
          }    
    
        

</script> </head> <body onclick="onstartstop()" ondblclick="onreset()"> <g:background id="imgBackground" src="background.png"> <div> <span id="watch">00:00:00.0</span> </div> </g:background> </body> </html>

Note: The code snippet plugin I use in Windows Live Writer likes to insert line numbers and alternate line backgrounds in embedded JavaScript.

Ignoring the embedded JavaScript for the moment, you can see that the entire gadget consists of a background image and some text. The g:background is a special tag for gadgets. It's use is obvious. There's a g:text and g:image tag as well. [You can read more about them here](http://msdn2.microsoft.com/en-us/library/bb676240%28VS.85%29.aspx).

#### Two pitfalls

If you create a new HTML document in Visual Studio it declares a proper DOCTYPE and HTML tag as follows:
    
    DOCTYPE html PUBLIC 
      "-//W3C//DTD XHTML 1.0 Transitional//EN" 
      "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>Untitled Page</title>
    </head>
    <body>
    
    </body>
    </html>

You're gadget won't display if you use this form. Remove the DOCTYPE and namespace references like so:
    
    <html>
    <head>
        <title>Untitled Page</title>
    </head>
    <body>
    
    </body>
    </html>

Now you're gadget displays. Fairly annoying if you ask me. Anyone know the reason why DOCTYPES don't work?

Also, set your margins to zero by adding the following style:
    
    <style type="text/css">
      body { margin:0 }
    </style>

Otherwise, the content displays in an unexpected manner.

#### The Rest

The JavaScript is what implements the Stopwatch behavior. This is a straightforward implementation using JavaScript timers. To set the text of the timer a bit of DOM manipulation is necessary to set the text node of the span tag.

Place the two files plus the image files in one of the Gadget folders under a folder named Stopwatch.gadget and you're done. Really honestly true. Open the Sidebar Gadget Gallery and double-click (or drag-drop) the Stopwatch gadget and you're done.

#### Extra credit: Settings dialog.

If you're gadget as user definable settings, you can easily add a settings dialog. It requires setting the System.Gadget.settingsUI (see line 2 of the JavaScript above) to the location of the HTML dialog with your settings dialog layout. Here's the one for Stopwatch.
    
    <html>
    <head>
      <title>Stopwatch Settings</title>
      <style type="text/css">
        body { margin: 0; width: 278px; height: 80; }
        p { line-height: 150%; font-family: Calibri; font-size: 15px; }
        img { float: left; margin-right: 15px; }
      </style>
    </head>
    <body>
      <p>
        <img src="logo.png" alt="" />For updates and other exciting programs go to <a href="http://mike-ward.net"
          onfocus="this.hideFocus=true;">http://mike-ward.net</a></p>
    </body>
    </html>

Since I didn't have any user definable settings I wanted to expose, I treated the settings dialog like an About dialog seen in many desktop applications. There's a [good tutorial here detailing how to use the System.Gadget.Settings](http://msdn2.microsoft.com/en-us/library/bb655904%28VS.85%29.aspx) namespace to capture and store settings for your gadget.

So that's it. With just a few files and a handful of code, we have a handsome and functional little gadget for the desktop. And because it's a gadget, it participates in all the cool gadget behaviors automatically and without extra coding.

The Stopwatch gadget is available from the [downloads page](/downloads).
