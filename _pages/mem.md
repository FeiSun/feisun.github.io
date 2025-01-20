---
layout: default
title: Mem
permalink: /mem/
description: 
nav: false
nav_order: 6
pagination:
  enabled: true
  collection: mem  # 这里改为 mem
  permalink: /page/:num/
  per_page: 10
  sort_field: date
  sort_reverse: true
  trail:
    before: 1
    after: 3
---

<div class="post">

{% assign mem_name_size = site.mem_name | size %}
{% assign mem_description_size = site.mem_description | size %}

{% if mem_name_size > 0 or mem_description_size > 0 %}
  <div class="header-bar">
    <h1>{{ site.mem_name }}</h1>
    <h2>{{ site.mem_description }}</h2>
  </div>
{% endif %}

{% if site.display_mem_tags and site.display_mem_tags.size > 0 or site.display_mem_categories and site.display_mem_categories.size > 0 %}
  <div class="tag-category-list">
    <ul class="p-0 m-0">
      {% for tag in site.display_mem_tags %}
        <li>
          <i class="fa-solid fa-hashtag fa-sm"></i> <a href="{{ tag | slugify | prepend: '/mem/tag/' | relative_url }}">{{ tag }}</a>
        </li>
        {% unless forloop.last %}
          <p>&bull;</p>
        {% endunless %}
      {% endfor %}
      {% if site.display_mem_categories.size > 0 and site.display_mem_tags.size > 0 %}
        <p>&bull;</p>
      {% endif %}
      {% for category in site.display_mem_categories %}
        <li>
          <i class="fa-solid fa-tag fa-sm"></i> <a href="{{ category | slugify | prepend: '/mem/category/' | relative_url }}">{{ category }}</a>
        </li>
        {% unless forloop.last %}
          <p>&bull;</p>
        {% endunless %}
      {% endfor %}
    </ul>
  </div>
{% endif %}

<ul class="post-list">
  {% if page.pagination.enabled %}
    {% assign memlist = paginator.posts %}
  {% else %}
    {% assign memlist = site.mem %}
  {% endif %}

  {% for mem in memlist %}
    {% assign read_time = mem.content | number_of_words | divided_by: 180 | plus: 1 %}
    {% assign year = mem.date | date: "%Y" %}
    {% assign tags = mem.tags | join: "" %}
    {% assign categories = mem.categories | join: "" %}

    <li>
      {% if mem.thumbnail %}
        <div class="row">
          <div class="col-sm-9">
      {% endif %}
      
      <h3>
        <a class="post-title" href="{{ mem.url | relative_url }}">{{ mem.title }}</a>
      </h3>
      <p>{{ mem.description }}</p>
      <p class="post-meta">
        {{ read_time }} min read &nbsp; &middot; &nbsp;
        {{ mem.date | date: '%B %d, %Y' }}
      </p>
      <p class="post-tags">
        <a href="{{ year | prepend: '/mem/' | prepend: site.baseurl}}">
          <i class="fa-solid fa-calendar fa-sm"></i> {{ year }}
        </a>

        {% if tags != "" %}
          &nbsp; &middot; &nbsp;
          {% for tag in mem.tags %}
            <a href="{{ tag | slugify | prepend: '/mem/tag/' | prepend: site.baseurl}}">
              <i class="fa-solid fa-hashtag fa-sm"></i> {{ tag }}</a>
            {% unless forloop.last %}
              &nbsp;
            {% endunless %}
          {% endfor %}
        {% endif %}

        {% if categories != "" %}
          &nbsp; &middot; &nbsp;
          {% for category in mem.categories %}
            <a href="{{ category | slugify | prepend: '/mem/category/' | prepend: site.baseurl}}">
              <i class="fa-solid fa-tag fa-sm"></i> {{ category }}</a>
            {% unless forloop.last %}
              &nbsp;
            {% endunless %}
          {% endfor %}
        {% endif %}
      </p>

      {% if mem.thumbnail %}
          </div>
          <div class="col-sm-3">
            <img class="card-img" src="{{ mem.thumbnail | relative_url }}" style="object-fit: cover; height: 90%" alt="image">
          </div>
        </div>
      {% endif %}
    </li>
  {% endfor %}
</ul>

{% if page.pagination.enabled %}
  {% include pagination.liquid %}
{% endif %}

</div>