---
layout: post  
title: 'Detect Strong Named Assemblies in .NET'
---
![image](/cdn/images/blog/DetectStrongNamedAssembliesin.NET_A51C/image_thumb.png) 

Seems like I get asked at least once a week how to determine if an assembly is strongly named. 

To detect if an assembly is strongly named in .NET use the SN.exe tool included with Visual Studio and the .NET SDK.

    sn -T _assembly_

To determine if the assembly is targeted for IL (any cpu), 32 bit or 64 bit

    corflags _assembly_
