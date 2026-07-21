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
