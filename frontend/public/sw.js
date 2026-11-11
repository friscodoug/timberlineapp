/* Offline support for the Cabin Mode guest portal.
   Saves the app on the phone the first time a guest opens it, so it still opens with no cell signal.
   Pages and code: try the internet first (so updates show right away), fall back to the saved copy.
   Photos: use the saved copy first.
   Change VERSION to make every phone start fresh. */
const VERSION = 'cabinmode-v1';

// Read the current index.html and save it plus every file it points to (the app code, styles, icons).
async function saveShell() {
  const cache = await caches.open(VERSION);
  const base = ['/', '/index.html', '/manifest.json', '/track.js'];
  try {
    const res = await fetch('/index.html', { cache: 'reload' });
    if (res.ok) {
      const html = await res.clone().text();
      await cache.put('/index.html', res.clone());
      await cache.put('/', res);
      const refs = [...html.matchAll(/(?:src|href)="(\/[^"]+)"/g)]
        .map((m) => m[1])
        .filter((u) => !u.startsWith('/_vercel/') && !u.startsWith('/src/'));
      base.push(...refs);
    }
  } catch (e) { /* offline during install: the fetch handler saves files as they load */ }
  try {
    const m = await (await fetch('/manifest.json', { cache: 'reload' })).json();
    (m.icons || []).forEach((i) => i.src && i.src.startsWith('/') && base.push(i.src));
  } catch (e) { /* no manifest icons */ }
  await Promise.all([...new Set(base)].map(async (u) => {
    if (u === '/' || u === '/index.html') return;
    try {
      const r = await fetch(u, { cache: 'reload' });
      if (r.ok) await cache.put(u, r);
    } catch (e) { /* skip anything that fails; the rest still saves */ }
  }));
}

self.addEventListener('install', (e) => { e.waitUntil(saveShell().then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k.startsWith('cabinmode-') && k !== VERSION).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

const usable = (r) => r && (r.ok || r.type === 'opaque');

async function networkFirst(req, key) {
  const cache = await caches.open(VERSION);
  try {
    const r = await fetch(req);
    if (r && r.ok) cache.put(key || req, r.clone());
    return r;
  } catch (e) {
    return (await cache.match(key || req, { ignoreSearch: true })) ||
      (req.mode === 'navigate' ? cache.match('/index.html') : Response.error());
  }
}

async function cacheFirst(req) {
  const cache = await caches.open(VERSION);
  const hit = await cache.match(req, { ignoreSearch: true });
  if (hit) return hit;
  try {
    const r = await fetch(req);
    if (usable(r)) cache.put(req, r.clone());
    return r;
  } catch (e) { return Response.error(); }
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Photos hosted elsewhere (cabin pictures, logos): save a copy the first time they load.
  if (url.origin !== self.location.origin) {
    if (req.destination === 'image') e.respondWith(cacheFirst(req));
    return; // weather, Spotify, maps, social links, sign-ups: always live
  }
  if (url.pathname.startsWith('/_vercel/') || url.pathname.startsWith('/api/')) return; // analytics + backend: always live
  if (url.pathname.startsWith('/audio/') || req.headers.has('range')) return;           // sounds stream normally

  if (req.mode === 'navigate') { e.respondWith(networkFirst(req, '/index.html')); return; }
  if (url.pathname.startsWith('/assets/')) { e.respondWith(cacheFirst(req)); return; } // file names change on every update
  if (req.destination === 'image') { e.respondWith(cacheFirst(req)); return; }
  e.respondWith(networkFirst(req, url.pathname));
});
