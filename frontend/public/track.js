/* Cabin Mode portal analytics — Vercel Web Analytics (no cookies, no personal info).
   Page views: one per screen, counted as /<cabin>/<screen> (e.g. /rocky-creek/dashboard) so visits split by cabin.
   Taps: every tile, button and link tap is a "Tap" event with 2 properties (the most the plan allows):
     cabin - the cabin the guest picked (guidebook slug), or "none" before picking
     tap   - "<screen> > <what was tapped>" (e.g. "dashboard > Weather", "campfire-mode > Play")
   Tracking never blocks or breaks the portal. */
(function () {
  var CABINS = {"1": "rocky-creek", "2": "champagne-bliss"};

  function cabin() {
    try { return CABINS[localStorage.getItem('selectedCabin')] || 'none'; } catch (e) { return 'none'; }
  }
  function screen() {
    return location.pathname.replace(/^\/+|\/+$/g, '') || 'welcome';
  }
  function clean(s, max) {
    return String(s || '').replace(/\s+/g, ' ').trim().slice(0, max || 60);
  }

  // ---- Page views ----
  var last = '';
  function pageview() {
    setTimeout(function () {
      try {
        var s = screen();
        var pick = s === 'welcome' || s === 'cabin-selection';
        var c = pick ? '' : cabin();
        var path = (c ? '/' + c : '') + '/' + s;
        if (path === last || !window.va) return;
        last = path;
        window.va('pageview', { route: (c ? '/[cabin]' : '') + '/' + s, path: path });
      } catch (e) { /* never break the portal */ }
    }, 60);
  }
  ['pushState', 'replaceState'].forEach(function (m) {
    var orig = history[m];
    history[m] = function () {
      var r = orig.apply(this, arguments);
      pageview();
      return r;
    };
  });
  window.addEventListener('popstate', pageview);
  pageview();

  // ---- Taps ----
  function pointer(n) {
    try { return getComputedStyle(n).cursor === 'pointer'; } catch (e) { return false; }
  }
  function tappable(t) {
    if (!t || !t.closest) return null;
    var el = t.closest('a,button,[role="button"],.menu-item');
    if (el) return el;
    for (var n = t, i = 0; n && n !== document.body && i < 6; n = n.parentElement, i++) {
      if (pointer(n)) {
        while (n.parentElement && n.parentElement !== document.body && pointer(n.parentElement)) n = n.parentElement;
        return n;
      }
    }
    return null;
  }
  function labelOf(el) {
    var named = el.getAttribute('data-track') || el.getAttribute('aria-label');
    if (named) return clean(named);
    var t = el.querySelector('.menu-title,h1,h2,h3,h4');
    if (t && clean(t.textContent)) return clean(t.textContent);
    var txt = clean(el.textContent);
    if (txt) return txt;
    var img = el.querySelector('img[alt]');
    return clean(el.getAttribute('title') || (img && img.getAttribute('alt'))) || 'Icon button';
  }
  function kindOf(el) {
    var href = el.tagName === 'A' ? el.getAttribute('href') || '' : '';
    if (/^tel:/.test(href)) return 'Call ';
    if (/^sms:/.test(href)) return 'Text ';
    if (/^mailto:/.test(href)) return 'Email ';
    return '';
  }

  document.addEventListener('click', function (ev) {
    try {
      var el = tappable(ev.target);
      if (!el || !window.va) return;
      var tap = clean(screen() + ' > ' + kindOf(el) + labelOf(el), 120);
      window.va('event', { name: 'Tap', data: { cabin: cabin(), tap: tap } });
    } catch (e) { /* never break the portal */ }
  }, true);
})();
