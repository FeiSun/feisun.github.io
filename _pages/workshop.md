---
layout: page
title: Workshop
permalink: /workshop/
description: 
nav: true
nav_order: 6
display_categories: [RecSys]
horizontal: false
---

<!-- pages/projects.md -->
<div class="projects">
{% if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {% for category in page.display_categories %}
    <h2 class="category">{{ category }}</h2>
  {% assign categorized_workshops = site.workshop | where: "category", category %}
  {% assign sorted_workshops = categorized_workshops | sort: "importance" %}
  <!-- Generate cards for each project -->
  {% if page.horizontal %}
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_workshops %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for workshop in sorted_workshops %}
      {% include workshop.liquid %}
    {% endfor %}
  </div>
  {% endif %}
  {% endfor %}

{% else %}

{% endif %}

</div>