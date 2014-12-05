---
layout: page  
title: Archive
---
{% for post in site.posts %}
{% capture month %}{{ post.date | date: '%m' }}{% endcapture %}
{% capture nmonth %}{{ post.next.date | date: '%m' }}{% endcapture %}
{% if month != nmonth %}<div>&nbsp;</div>{% endif %}
<div>{{ post.date | date: "%F" }}&nbsp;&nbsp;&nbsp;<a href="{{ post.url }}">{{ post.title }}</a></div>
{% endfor %}