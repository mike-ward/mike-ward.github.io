---
layout: post
title: 'Adding ELMAH to a Nancy Site'
---
Description of [ELMA](https://code.google.com/p/elmah/)H from the web site:

> ELMAH (Error Logging Modules and Handlers) is an application-wide error logging facility that is completely pluggable. It can be dynamically added to a running [ASP.NET](http://www.asp.net/) web application, or even all ASP.NET web applications on a machine, without any need for re-compilation or re-deployment. 
> 
> Once ELMAH has been dropped into a running web application and configured appropriately, you get the following facilities without changing a single line of your code:

* Logging of nearly all unhandled exceptions. 
* A web page to remotely view the entire log of recoded exceptions. 
* A web page to remotely view the full details of any one logged exception, including colored stack traces. 
* In many cases, you can review the original [yellow screen of death](http://en.wikipedia.org/wiki/Yellow_Screen_of_Death#ASP.NET) that ASP.NET generated for a given exception, even with `customErrorsmode` turned off. 
* An e-mail notification of each error at the time it occurs. 
* An RSS feed of the last 15 errors from the log.

It’s, “The bee’s knees ”, in my opinion and thanks to the [Nuget](https://nuget.org/packages/Nancy.Elmah) package, a breeze to install.

Open the [package manager console](http://docs.nuget.org/docs/start-here/using-the-package-manager-console) in Visual Studio and type the following:
    
    PM> Install-Package Nancy.Elmah

Open your `Bootstrapper` class and add ELMAH to the processing pipeline:
    
    namespace Nancy.Elmah.Asp.Net.Example  
    {  
        public class Bootstrapper : DefaultNancyBootstrapper  
        {  
            protected override void ApplicationStartup(TinyIoc.TinyIoCContainer container,   
                Nancy.Bootstrapper.IPipelines pipelines)  
            {  
                Elmahlogging.Enable(pipelines, "elmah");  
            }  
        }  
    }

Next, open your Web.config. You can remove the <location> element that the ELMAH installer added near the bottom of the file.

The ELMAH installer modifies the `Web.config` to configure ELMAH. It **does not** configure where the errors are stored. There are many options including SQL Server and Oracle. I personally like to use files. Here’s an example configuration.
    
    <elmah>  
      <security allowRemoteAccess="true" />  
      <errorLog type="Elmah.XmlFileErrorLog, Elmah" logPath="~/App_Data/Elmah" />  
    </elmah>

I also enable remote access. It’s convenient but be aware there’s a security risk.

Open the ELMAH dashboard and navigate to _http://yourwebsite/elmah_

Here’s an example dashboard:

![](/cdn/images/blog/WindowsLiveWriter/InstallingelmahonaNancySite_C011/homeshot_2.png)

Finally, I discovered a minor bug in Nancy where [some accept headers can raise exceptions](https://groups.google.com/forum/#!topic/nancy-web-framework/AfvVl5gSssM). On my site it was generating several hundred log messages a day. There’s a bug logged and it will likely be fixed in a future version of [Nancy](http://nancyfx.org/). In the meantime, you can modify your ELMAH configuration to remove these exceptions. Here’s the final form of the ELMAH configuration.
    
    <elmah>  
      <security allowRemoteAccess="true" />  
      <errorLog type="Elmah.XmlFileErrorLog, Elmah" logPath="~/App_Data/Elmah" />  
      <errorFilter>  
        <test>  
          <regex binding="Exception.Message" type="System.ArgumentException"   
            pattern="inputString not in correct Type/SubType format" />  
        </test>  
      </errorFilter>  
    </elmah>  
