---
layout: post  
title: 'Implementing INotifyPropertyChanged'
---
Writing programs in WPF usually involves implementing `INotifyPropertyChanged`. Implementing this interface the standard way involves a fair-bit of boilerplate code. It's tiresome and error prone. 

There are many ways to mitigate this issue. Frameworks like [Caliburn.Micro](http://caliburnmicro.com/) or post compilers like [PostSharp](http://www.postsharp.net/) can reduce the amount of required boilerplate.

I opt for a middle ground and implement the interface directly with the addition of one helper method.

    public event PropertyChangedEventHandler PropertyChanged;

    protected virtual void OnPropertyChanged(string propertyName)
    {
        var handler = PropertyChanged;
        if (handler != null) handler(this, new PropertyChangedEventArgs(propertyName));
    }
    
    private void Set<T>(ref T property, T value, [CallerMemberName] string propertyName = null)
    {
        if (EqualityComparer<T>.Default.Equals(property, value)) return;
        property = value;
        OnPropertyChanged(propertyName);
    }

I can then write properties as follows

    public string Name
    {
        get { return _name; }
        set { Set(ref _name, value); }
    }

It's a compromise between a big hammer like Caliburn.Micro or PostSharp and boilerplate. 

The `EqualityComparer<T>.Default.Equals(property, value)` call avoids boxing value types, a common criticism of some approaches.