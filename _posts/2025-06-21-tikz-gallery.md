---
layout: post
title: "TikZ Gallery"
date: 2025-06-20 22:30:00
description: A collection of TikZ examples in my papers.
tags: latex tikz
categories: latex
featured: true
---

## two system comparison

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        <a href="https://raw.githubusercontent.com/FeiSun/LaTeX-Drawing/refs/heads/master/Drawing/editing_eval.tex" target="_blank">
            {% include figure.liquid loading="eager" path="assets/img/blog/latex/editing_evaluation.png" class="img-fluid rounded z-depth-1" %}
        </a>
    </div>
</div>
<div class="caption">
   ACL 2025 paper *[The Mirage of Model Editing: Revisiting Evaluation in the Wild](https://arxiv.org/abs/2502.11177)*
</div>

* TikZ pics for reusable components: Defines a pics/self_att module (the abstract module in ROME paper) containing hidden states, MHA, and MLP layers that can be instantiated repeatedly, streamlining neural network diagram creation.
