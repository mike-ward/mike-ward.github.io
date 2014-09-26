---
layout: page
title: Archive
---
{% for post in site.posts %}
{{ post.date | date: "%F" }}&nbsp;&nbsp;&nbsp;[ {{ post.title }} ]({{ post.url }})<br>
{% endfor %}