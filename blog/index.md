---
layout: default
title: Blog
description: These are thoughts of mine. Ideas translated into words, to share with you the experiences I go through. It's all about the conversation.
permalink: /blog/
in-nav: true
---

<div class="inwrap story clearfix">

    <h1>Blog</h1>

    <p>These are thoughts of mine. Ideas translated into words, to share with you the experiences I go through. It's all about the conversation.</p>

    {% for post in site.posts %}

        <article>

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

        </article>

    {% endfor %}

</div>
