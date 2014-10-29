---
layout: post
title: "WPF - Set Focus to List Box Item"
---

Yes, I'm writing a post on how to set the keyboard focus to the first item of a list-box in WPF. And it only took an hour to find a solution. Not that I'm bitter but, "Holy %*@#!", why does something so simple require 15 lines of code!

    public RecentFilesDialog()
    {
        InitializeComponent();
        FilesListBox.ItemsSource = Settings.Default.RecentFiles.Cast<string>().Reverse().Skip(1);
        FilesListBox.ItemContainerGenerator.StatusChanged += ItemContainerGeneratorOnStatusChanged;
    }
    
    private void ItemContainerGeneratorOnStatusChanged(object sender, EventArgs eventArgs)
    {
        if (FilesListBox.ItemContainerGenerator.Status == GeneratorStatus.ContainersGenerated)
        {
            var index = FilesListBox.SelectedIndex;
            if (index >= 0)
            {
                var item = FilesListBox.ItemContainerGenerator.ContainerFromIndex(index) as ListBoxItem;
                if (item != null) item.Focus();
            }
        }
    }

You'll see lots of articles about using `FocusManager` on an element. Doesn't work. Focus goes to the control, not the item.

This code recognizes that `ItemSource` loads asynchronously and waits until `ItemContainerGenerator` has finished before trying to set keyboard focus.

Reference: [Selecting first item in WPF ListView and keyboard navigation](http://cytivrat.blogspot.com/2011/05/selecting-first-item-in-wpf-listview.html)