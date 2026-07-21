// Mermaid Kaz — the only behaviour the site needs: the mobile menu.
// Everything else (layout, colour, motion) is CSS on the token contract.
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
