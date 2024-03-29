---
layout: post
title: 'Keyboard Handling in WPF Popup Class'
---
It's quite a bit of effort to get a Windows Presentation Foundation (WPF) `Popup` to close when the `Escape` key is pressed. There are several solutions freely available on the Web, but none of them worked for my use case so I wrote one. 

`PopupAllowKeyboardInput` is implemented as an [attached behavior](http://msdn.microsoft.com/en-us/library/ms749011.aspx). It's MIT licensed.

[PopupAllowKeyboardInput.cs](https://gist.github.com/mike-ward/6672436)
    
    /*   
    Copyright (C) 2013 Mike Ward (http://mike-ward.net)  
      
    Permission is hereby granted, free of charge, to any person obtaining a copy of  
    this software and associated documentation files (the "Software"), to deal in   
    the Software without restriction, including without limitation the rights to   
    use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies   
    of the Software, and to permit persons to whom the Software is furnished to do   
    so, subject to the following conditions:  
      
    The above copyright notice and this permission notice shall be included in all   
    copies or substantial portions of the Software.  
      
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR   
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,   
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE   
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER   
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE  
    SOFTWARE.  
    */  
      
    using System.Windows;  
    using System.Windows.Controls.Primitives;  
    using System.Windows.Input;  
      
    namespace tweetz5.Controls  
    {  
        public class PopupAllowKeyboardInput  
        {  
            public static readonly DependencyProperty IsEnabledProperty =   
                DependencyProperty.RegisterAttached(  
                    "IsEnabled",  
                    typeof (bool),  
                    typeof (PopupAllowKeyboardInput),  
                    new PropertyMetadata(default(bool), IsEnabledChanged));  
          
            public static bool GetIsEnabled(DependencyObject d)  
            {  
                return (bool)d.GetValue(IsEnabledProperty);  
            }  
      
            public static void SetIsEnabled(DependencyObject d, bool value)  
            {  
                d.SetValue(IsEnabledProperty, value);  
            }  
      
            private static void IsEnabledChanged(DependencyObject sender,   
                DependencyPropertyChangedEventArgs ea)  
            {  
                EnableKeyboardInput((Popup)sender, (bool)ea.NewValue);  
            }  
      
            private static void EnableKeyboardInput(Popup popup, bool enable)  
            {  
                if (enable)  
                {  
                    IInputElement element = null;  
                    popup.Loaded += (sender, args) =>  
                    {  
                        popup.Child.Focusable = true;  
                        popup.Child.IsVisibleChanged += (o, ea) =>  
                        {  
                            if (popup.Child.IsVisible)  
                            {  
                                element = Keyboard.FocusedElement;  
                                Keyboard.Focus(popup.Child);  
                            }  
                        };  
                    };  
                    // ReSharper disable ImplicitlyCapturedClosure  
                    popup.Closed += (sender, args) => Keyboard.Focus(element);  
                }  
            }  
        }  
    }

`PopupAllowKeyboardInput` works even if the `Popup` Child is a non-focusable item like `Border` or `TextBlock`. To use this behavior, add it to the `Popup` declaration and keyboard bindings as follows:
    
    <Popup x:Class="tweetz5.Controls.ShortcutHelp"  
           xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"  
           xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"  
           xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"   
           xmlns:d="http://schemas.microsoft.com/expression/blend/2008"   
           xmlns:controls="clr-namespace:tweetz5.Controls"  
           mc:Ignorable="d"   
           PopupAnimation="Fade"  
           AllowsTransparency="True"  
           StaysOpen="False"  
           Height="Auto"   
           Width="190"  
           TextOptions.TextFormattingMode="Display"  
           controls:PopupAllowKeyboardInput.IsEnabled="True"  
           DataContext="{Binding RelativeSource={RelativeSource Self}}">  
      <Popup.CommandBindings>  
        <CommandBinding Command="Close" Executed="CloseCommandHandler"/>  
      </Popup.CommandBindings>  
      <Popup.InputBindings>  
        <KeyBinding Key="Escape" Command="Close"/>  
      </Popup.InputBindings>  
      ...  
    </Popup>

(`controls:PopupAllowKeyboardInput.IsEnabled="True"` is the attached behavior)

In the example above, I've bound the Escape key to the standard, `Close` command. The `CloseCommandHandler` is implemented in the `Popup` control (not shown).

A couple of notes on the code. 

  * Setting, `Focusable = "True"`, on the `Popup` instance does not work. Using the `Popup` Child control as focusable does work. 
  * The `Opened` event in the `Popup` class fires before the Child control is visible. The Child control must be visible to receive focus. 
  * `IsVisibleChanged` never fires on the Popup instance. This is why the `IsVisibleChanged` event of the Child control is hooked.
