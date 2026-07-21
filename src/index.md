---
title: "Tasmania's First PADI Mermaid Instructor"
description: "Kaz is Tasmania's first PADI Mermaid Instructor and professional mermaid performer — PADI Mermaid courses, mermaid entertainment for events and parties, and retreat experiences."
layout: page
hero:
  title: "Tasmania's First PADI Mermaid Instructor"
  subtitle: "PADI Mermaid courses, enchanting entertainment for events and parties, and retreat experiences — in the pool and the ocean."
  image: "/assets/images/uploads/hero-kaz-beach.jpg"
  imageAlt: "Kaz lying in the sunlit shallows of a Tasmanian beach in her blue and violet mermaid tail"
  cta:
    text: "Explore the magic"
    url: "/services/"
  cta2:
    text: "Get in touch"
    url: "/contact/"
---

## Welcome

Kaz is Tasmania's first PADI Mermaid, professional mermaid performer, and the
first Mermaid Instructor on the island. Trained with some of Australia's top
mermaid instructors and instructor trainers, she shares her passion for mermaid
diving and the beauty of fluid, peaceful underwater movement — be it in the
pool or the ocean.

<div class="card-grid">
{% set service = {
  title: "PADI Mermaid Courses",
  description: "Learn to mermaid with Tasmania's first PADI Mermaid Instructor — structured PADI courses covering skills, safety and that beautiful, fluid underwater movement.",
  cta: { url: site.booking.courses_url, text: "View courses", class: "button-primary" }
} %}
{% include "service-card.njk" %}
{% set service = {
  title: "Mermaid Entertainment",
  description: "A real live mermaid for your event — community events, corporate events and birthday parties, delivered with over 17 years of experience working with children and performing.",
  cta: { url: "/services/#entertainment", text: "Entertainment packages", class: "button-secondary" }
} %}
{% include "service-card.njk" %}
{% set service = {
  title: "Mermaid Retreats",
  description: "Immersive mermaid retreat experiences in Tasmania's beautiful waters. Enquire for upcoming dates and details.",
  cta: { url: "/contact/", text: "Enquire", class: "button-secondary" }
} %}
{% include "service-card.njk" %}
</div>

<div class="cta-band">

## Ready to make some magic?

Book mermaid entertainment for your event, ask about retreats, or start your
own mermaid journey.

<div class="cta-row">
  <a href="/contact/" class="button button-primary">Get in touch</a>
  <a href="{{ site.booking.courses_url }}" class="button button-secondary" target="_blank" rel="noopener noreferrer">Browse PADI courses</a>
</div>

</div>

_Follow along on <a href="https://www.instagram.com/mermaid_kaz/" target="_blank" rel="noopener noreferrer">Instagram</a> and
<a href="https://www.facebook.com/profile.php?id=61553609431660" target="_blank" rel="noopener noreferrer">Facebook</a> for the
latest underwater magic._
