---
layout: default
title: Blog
---

<ul class="post-list">
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}" class="alt">{{ post.title }}</a>
      <time>{{ post.date | date: "%A" }}, {{ post.date | date_to_long_string: "ordinal"}}</time>
    </li>
  {% endfor %}
</ul>
