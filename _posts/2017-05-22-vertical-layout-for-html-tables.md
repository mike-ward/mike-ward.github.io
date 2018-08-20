---
layout: post  
title:  Vertical Layout for HTML Tables  
...

One of the difficulties I find with writing HTML tables is managing all
the closing tags and indention to keep the code readable. Recently, I
discovered the HTML5 spec does not require closing tags for data and
rows. This allows me to write in a style that flattens out and nesting
of tables and makes them easier to edit.

Example:

    <table>
    <tr>
    <th> Server
    <th> IP
    <th> Description
    <tr>
    <td> cl1
    <td> 192.168.100.1
    <td> This is my first server in the list
    <tr>
    <td> cl2
    <td> 10.10.1.22
    <td> This is another one server
    <tr>
    <td> windows-5BSD567DSLOS
    <td> 127.0.0.12
    <td> This is customer windows vm. dont touch this!
    <tr>
    <td> DFHSDDFFXYXKENLONGNAME
    <td> 192.168.1.50
    <td> Some printer
    </table>

And the result:

<table>
<tr>
<th> Server
<th> IP
<th> Description
<tr>
<td> cl1
<td> 192.168.100.1
<td> This is my first server in the list
<tr>
<td> cl2
<td> 10.10.1.22
<td> This is another one server
<tr>
<td> windows-5BSD567DSLOS
<td> 127.0.0.12
<td> This is customer windows vm. dont touch this!
<tr>
<td> DFHSDDFFXYZKENLONGNAME
<td> 192.168.1.50
<td> Some printer
</table>

And here's a [live demo](https://flems.io/#0=N4IgzgpgNhDGAuEAmIBcICWA7JEAeAdABbwC2UIANCAGYYxhoDaoWAhqRGpjvsWRWqwA9lkRjuAHnhsARjAB8AHSzSATstXwiCgAQBlCGoBuRldJ26AkgAVz2vQBEIYWGowAHeBlH2N9pD1YKABGAL0QgE4AJgIQgDYADjiABhS48N0AFSIMMF083VIAT106NTB4XUgTIwKsXW0IXSg8+BU-TWlA3WDozJD0wbiCaP6tHpzCwrYsYSa1XVFmmtM1Dq1-Cb0Ad2wkYR2wAFoAVgAhfUdT+IB2R30AGQB5fQHo24J0ofHuvSn8oVYABXSrCTiLPY4Q75YykAi6A5iRrCYGwIiNXJgACEG3UXXgPUcADEABJXEnEgAaAE0qQBpACiADkXsyAOLMgCCAFlGQMYnEkiNTilMvpwc0PO4xGZVAB6GTyCAKKjgaBwbyiRjoKKoFIgAC+lFYHC46AIACtGEJROJ4NwjQBdQ1AA)