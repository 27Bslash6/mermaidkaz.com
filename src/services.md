---
title: "Mermaid Services"
subtitle: "Courses, entertainment and retreats — magic above and below the water"
description: "PADI Mermaid courses, mermaid entertainment for events and parties, and retreat experiences with Kaz, Tasmania's first PADI Mermaid Instructor."
layout: page
---

<h2 id="courses">PADI Mermaid Courses</h2>

Learn to mermaid with Tasmania's first PADI Mermaid Instructor. Kaz's courses
follow the international PADI Mermaid program and share her passion for
mermaid diving and fluid, peaceful underwater movement — in the pool or the
ocean.

All PADI Mermaid courses are booked through Freedive Tasmania.

<p><a href="https://www.freedivetasmania.com/search?q=mermaid" class="button button-primary" target="_blank" rel="noopener">View courses at Freedive Tasmania</a>
{% set ebKey = "padi-courses" %}{% set ebClass = "button-secondary" %}{% include "eventbrite-button.njk" %}{% set ebClass = null %}</p>

<h2 id="entertainment">Mermaid Entertainment</h2>

Here at Mermaid Kaz, we pride ourselves on delivering premium quality
experiences with an extremely high standard of professionalism and customer
service. Kaz has over 17 years of experience working with children and
performing. Our packages are listed below — get in touch with any enquiries
or to book for your event.

<div class="card-grid">
{% set service = {
  title: "Birthday Parties — Dry Land Experience",
  image: "src/assets/images/uploads/party-story-time.jpg",
  imageAlt: "Kaz in her blue mermaid tail reading a story to a circle of children at a birthday party",
  price: "$420 all-inclusive for 10 children, plus travel costs",
  features: ["1.5 hour party", "Photo opportunities", "Mermaid temporary tattoos", "Mermaid face paint", "Mermaid story time", "Gift for the birthday child", "2 party games"],
  description: "Optional extras: plastic-free party bags and customised invitations.",
  cta: { url: "/contact/", text: "Book this package", class: "button-primary" },
  eventbriteKey: "birthday-dry-land"
} %}
{% include "service-card.njk" %}
{% set service = {
  title: "Birthday Parties — Pool or Beach Experience",
  image: "src/assets/images/uploads/party-pool-swim.jpg",
  imageAlt: "Kaz in the pool as a mermaid, chatting with children at the pool edge",
  price: "$460 all-inclusive for 10 children, plus travel costs",
  features: ["1.5 hour party — private or public pools, or the beach", "Swim with a Mermaid experience", "Photo opportunities", "Mermaid temporary tattoos", "Mermaid face paint", "Gift for the birthday child", "1 party game"],
  description: "Optional extras: plastic-free party bags and customised invitations.",
  cta: { url: "/contact/", text: "Book this package", class: "button-primary" },
  eventbriteKey: "birthday-pool-beach"
} %}
{% include "service-card.njk" %}
{% set service = {
  title: "Public Appearances — Beach, Pool or On Land",
  image: "src/assets/images/uploads/public-event-kaz-pirate.jpg",
  imageAlt: "Kaz in her mermaid tail beside a pirate performer, entertaining children at a public pool event",
  price: "$175 per hour, plus travel costs (1.5 hours minimum)",
  features: ["Perfect for promotional and community events", "Meet and Greet a Mermaid time", "Swim with a Mermaid experience (if in water)", "Photo opportunities", "Crafts, temporary tattoos and face painting"],
  cta: { url: "/contact/", text: "Enquire about an event", class: "button-primary" },
  eventbriteKey: "public-appearances"
} %}
{% include "service-card.njk" %}
</div>

<h2 id="retreats">Mermaid Retreats</h2>

Kaz also offers mermaid retreat experiences in Tasmania's beautiful waters.
Enquire for upcoming dates, locations and details.

<p>{% set ebKey = "retreats" %}{% include "eventbrite-button.njk" %}
<a href="/contact/" class="button button-secondary">Ask about retreats</a></p>

<div class="cta-band">

## Not sure where to start?

Tell us what you're dreaming of and Kaz will point you to the right
experience.

<div class="cta-row">
  <a href="/contact/" class="button button-primary">Contact Kaz</a>
</div>

</div>
