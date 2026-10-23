---
layout: publication
permalink: /publications/
title: Pubs
description: 
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

<!-- {% include bib_search.liquid %} -->

<div class="publications">

<!-- Entries marked with preprint={true} in papers.bib are listed here, above the yearly groups. -->
{% capture preprint_count %}{% bibliography_count --query @*[preprint=true] %}{% endcapture %}
{% if preprint_count != '0' %}
<h2 class="bibliography">Preprint</h2>
{% bibliography --group_by none --query @*[preprint=true] %}
{% endif %}

{% bibliography --query @*[preprint!=true] %}

</div>
