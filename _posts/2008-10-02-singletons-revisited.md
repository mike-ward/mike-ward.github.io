---
layout: post  
title: 'Singletons Revisited'
---
[Earlier I wrote](/2008/09/24/the-definitive-c-singleton) about how easy it was to write thread-safe, lazily constructed singletons in C#. To recap:
    
    sealed class Singleton
    {
        static Singleton() { }
        public static readonly Singleton Instance = new Singleton();
        Singleton() { /* initialization code here */ }
        // public methods here...
    }

The .NET Framework insures that “Instance” is only instantiated once, even with multiple threads. The static constructor is necessary for lazy initialization. It’s remarkably simple and relatively easy to understand.

I also mentioned that I thought singletons were pure evil. As one reader correctly pointed out, it’s not the pattern that’s evil, but how it’s typically used. I’ll concede that there are times when singletons are useful. However, I never cared for the call pattern typically used. Calling a method or property from the example above looks something like this:
    
    Singleton.Instance.SomeMethodOrProperty();

Ok, so now the whole world knows I’m using a singleton. It’s also just a bit annoying to have to call Instance every time Singleton is accessed. I can’t think of one .NET Framework API exposes an Instance method for the purpose of implementing a singleton. (of course someone out there will know of one I’m sure)

I prefer to make singletons look like static classes. It looks cleaner and hides the implementation details from the caller. Here’s an admittedly contrived example:
    
    sealed class Stuff
    {
        private string blueStuff;
        private string greenStuff;
        private string redStuff;
    
        static Stuff() { }
        private static readonly Stuff instance = new Stuff();
    
        private Stuff()
        {
            blueStuff = "blue stuff";
            greenStuff = "green stuff";
            redStuff = "red stuff";
        }
    
        public static string BlueStuff { get { return instance.blueStuff; } }
        public static string GreenStuff { get { return instance.greenStuff; } }
        public static string RedStuff { get { return instance.redStuff; } }
    }

Calling the members of this class is much more natural.
    
    Console.WriteLine(Stuff.BlueStuff);
    Console.WriteLine(Stuff.GreenStuff);
    Console.WriteLine(Stuff.RedStuff);

From the caller’s point of view, `Stuff` appears to be static. The messiness of the instance member is hidden from the callers.
