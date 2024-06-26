---
layout: post  
title: 'Writing Faster Managed Code: Know What Things Cost'
---
Jan Gray of the Microsoft CLR Performance Team has published an excellent (and lengthy) [paper](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dndotnet/html/fastmanagedcode.asp) on how much operations like function calls and object allocation cost performance wise in managed code. This article has also appeared on SlashDot and Digg so you probably already know about. I've actually read the article and I can sincerely say that if you are a managed code programmer, it is definitely worth your time.

The article has lots of tables with numbers about the relative costs of operations. I glanced at these. More important to me are the techniques Gray outlines on how to attack stubborn performance problems using tools like the CLR Profiler. In another section, he talks about how hardware advances effect (or should effect) the code we write. Here's an excerpt I found enlightening.

> Back in the "good old days", circa 1983, processors were slow (~.5 million instructions/s), and relatively speaking, RAM was fast enough but small (~300 ns access times on 256 KB of DRAM), and disks were slow and large (~25 ms access times on 10 MB disks). PC microprocessors were scalar CISCs, most floating point was in software, and there were no caches.
> 
> After twenty more years of Moore's Law, circa 2003, processors are _fast _(issuing up to three operations per cycle at 3 GHz), RAM is relatively very slow (~100 ns access times on 512 MB of DRAM), and disks are _glacially_ slow and _enormous_ (~10 ms access times on 100 GB disks). PC microprocessors are now out-of-order dataflow superscalar hyperthreading trace-cache RISCs (running decoded CISC instructions) and there are several layers of caches—for example, a certain server-oriented microprocessor has 32 KB level 1 data cache (perhaps 2 cycles of latency), 512 KB L2 data cache, and 2 MB L3 data cache (perhaps a dozen cycles of latency), all on chip.
> 
> In the good old days, you could, and sometimes did, count the bytes of code you wrote, and count the number of cycles that code needed to run. A load or store took about the same number of cycles as an add. The modern processor uses branch prediction, speculation, and out-of-order (dataflow) execution across multiple function units to find instruction level parallelism and so make progress on several fronts at once. 
> 
> Now our fastest PCs can issue up to ~9000 operations per microsecond, but in that same microsecond, only load or store to DRAM ~10 cache lines. In computer architecture circles this is known as _hitting the memory__wall_. Caches hide the memory latency, but only to a point. If code or data does not fit in cache, and/or exhibits poor locality of reference, our 9000 operation-per-microsecond supersonic jet degenerates to a 10 load-per-microsecond tricycle.

This is [article](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dndotnet/html/fastmanagedcode.asp) is definitely worth your time.
