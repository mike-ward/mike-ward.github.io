---
layout: post
title: 'Drag and Drop in WPF'
---
Well in this case, just Drop.

There are plenty of examples on the Web on how to do Drag and Drop in Windows but often they leave out a few essentials. To start, you tell windows that you're a drop target by setting the `AllowDrop` property and assigning handlers for the `Drop` and `DragOver` events.
    
    <Window xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"  
            xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"\  
            AllowDrop="True"  
            Drop="OnDrop"  
            DragOver="OnDragOver"  
            ...  
            >  

Many tutorials have you add a handler to the `DragEnter` event, but this not correct. `DragEnter` is useful if you need to allocate a resource, like a brush, to be used as custom indicator. In most circumstances, it’s the `DragOver` event that requires a handler.

The handlers themselves are straight-forward. Here’s one that handles file drops.
    
    private void OnDragOver(object sender, DragEventArgs ea)  
    {  
        ea.Handled = true;  
        ea.Effects = DragDropEffects.None;  
        if (ea.Data.GetDataPresent(DataFormats.FileDrop, true))  
        {  
            var filenames = ea.Data.GetData(DataFormats.FileDrop, true) as string[];  
            if (filenames != null && filenames.Length == 1 && IsValidImageExtension(filenames[0]))  
            {  
                ea.Effects = DragDropEffects.Copy;  
            }  
        }  
    }  
      
    private void OnDrop(object sender, DragEventArgs ea)  
    {  
        if (ea.Data.GetDataPresent(DataFormats.FileDrop, true))  
        {  
            var filenames = ea.Data.GetData(DataFormats.FileDrop, true) as string[];  
            if (filenames != null && filenames.Length == 1 && IsValidImageExtension(filenames[0]))  
            {  
                // My program logic here...  
                ea.Handled = true;  
            }  
        }  
    }  
      
    private static bool IsValidImageExtension(string filename)  
    {  
        var extension = Path.GetExtension(filename);  
        var extensions = new[] { ".png", ".jpg", ".jpeg", ".gif" };  
        return extensions.Any(e => extension.Equals(e, StringComparison.OrdinalIgnoreCase));  
    }  

Here I’m checking that the file extension is a PNG, JPG or GIF. I’m also only interested in handling one file. Your program will have different requirements.

The one “gotcha” that most examples omit is setting the `ea.Handled` property to `True` (some of Microsoft’s examples miss this). Not doing so usually results in the drop indicator appearing not to work (`DragDropEffects.Copy` in this case). Worse, if you have multiple drop handlers, they may be inadvertently called (Not that I’ve ever done that).

Pro tip: Always write about something immediately after you’ve learned it but make sure you sound like you’ve been doing it that way for years :)
