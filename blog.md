---
layout: page
title: Blog
excerpt: A collection of thoughts, ideas, experiences and observations, opinions sometimes, translated into words, mostly about my life and the things it's made of.
in_nav: true
redirect_from: /posts/
---

{% for post in site.posts %}
  <article>
    <header class="post-header">
      <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>

      <time>
        {% assign d = post.date | date: "%-d"  %}
        {{ post.date | date: "%A," }}
        {% case d %}
          {% when '1' or '21' or '31' %}{{ d }}st
          {% when '2' or '22' %}{{ d }}nd
          {% when '3' or '23' %}{{ d }}rd
          {% else %}{{ d }}th
        {% endcase %}
        {{ post.date | date: "%B %Y" }}
      </time>

      {{ post.excerpt }}
    </header>
  </article>
{% endfor %}