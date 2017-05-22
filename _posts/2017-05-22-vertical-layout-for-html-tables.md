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
</tr>
</table>

