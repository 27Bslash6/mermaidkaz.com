// Mermaid Kaz — site behaviour: the mobile menu, plus Eventbrite checkout
// triggers when a page has any. Everything else (layout, colour, motion) is
// CSS on the token contract.
(function () {
  'use strict';

  var toggle = document.querySelector('.mobile-menu-toggle');
  var menu = document.querySelector('.site-nav-links');
  if (!toggle || !menu) {
    return;
  }

  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('show');
    toggle.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('click', function (e) {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('show');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

// Holographic card tilt (LAB-504, after simeydotme's pokemon-cards-css):
// the pointer position becomes CSS custom properties and main.css does the
// rest (tilt toward the cursor, glare + shine sliding under the content).
// Gated to fine pointers with hover and no reduced-motion preference —
// everyone else keeps the pure-CSS lift, so this is enhancement only.
(function () {
  'use strict';

  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    return;
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  var cards = document.querySelectorAll('.service-card');
  if (!cards.length) {
    return;
  }

  var PROPS = ['--px', '--py', '--tilt-x', '--tilt-y'];

  Array.prototype.forEach.call(cards, function (card) {
    var frame = null;

    card.addEventListener('pointermove', function (e) {
      if (frame) {
        return; // one style write per animation frame
      }
      frame = requestAnimationFrame(function () {
        frame = null;
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width;
        var y = (e.clientY - rect.top) / rect.height;
        card.style.setProperty('--px', (x * 100).toFixed(1) + '%');
        card.style.setProperty('--py', (y * 100).toFixed(1) + '%');
        // lean toward the cursor: max ±5deg side-to-side, ±4deg top-to-bottom
        card.style.setProperty('--tilt-y', ((x - 0.5) * 10).toFixed(2) + 'deg');
        card.style.setProperty('--tilt-x', ((0.5 - y) * 8).toFixed(2) + 'deg');
      });
    });

    card.addEventListener('pointerleave', function () {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = null;
      }
      PROPS.forEach(function (prop) {
        card.style.removeProperty(prop);
      });
    });
  });
})();

// Eventbrite embedded checkout (see src/_includes/eventbrite-button.njk).
// eb_widgets.js is only fetched on pages that actually render a trigger, so
// the third-party script costs nothing site-wide. Until the widget has bound
// (slow network, blocked script), a click falls back to the event page —
// no dead buttons, ever.
(function () {
  'use strict';

  var triggers = document.querySelectorAll('[data-eventbrite-id]');
  if (!triggers.length) {
    return;
  }

  Array.prototype.forEach.call(triggers, function (trigger, i) {
    trigger.removeAttribute('hidden');
    if (!trigger.id) {
      trigger.id = 'eventbrite-trigger-' + i;
    }
    trigger.addEventListener('click', function () {
      if (trigger.dataset.ebReady === '1') {
        return; // the Eventbrite modal owns this click
      }
      window.open(trigger.getAttribute('data-eventbrite-url'), '_blank', 'noopener');
    });
  });

  var script = document.createElement('script');
  script.src = 'https://www.eventbrite.com/static/widgets/eb_widgets.js';
  script.defer = true;
  script.onload = function () {
    if (!window.EBWidgets) {
      return; // fallback click handler keeps working
    }
    Array.prototype.forEach.call(triggers, function (trigger) {
      window.EBWidgets.createWidget({
        widgetType: 'checkout',
        eventId: trigger.getAttribute('data-eventbrite-id'),
        modal: true,
        modalTriggerElementId: trigger.id
      });
      trigger.dataset.ebReady = '1';
    });
  };
  document.head.appendChild(script);
})();
