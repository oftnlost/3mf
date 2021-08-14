---
title: Shop
layout: base.njk
---

<div class="info">
	<h2>Shop</h2>
<div class="product-selection">
<div class="products">

{% for product in collections.products %}

<div class="product">
<img class="product-image" src="https://via.placeholder.com/300x300">
<div class="product__details">
	<a class="product__url" href={{product.url}}><h3 class="product__name">{{ product.data.product_name }}</h3></a>
	<span class="product__price">{{ product.data.price }}</span>
</div>
</div>

{%- endfor %}

</div>
</div>

</div>