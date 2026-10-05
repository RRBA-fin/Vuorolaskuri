// Vuorolaskurin service worker: toimii myös ilman verkkoa.
// Sovellus ja vuorolista haetaan ensin verkosta (jotta uusi lista näkyy heti), ja välimuistista vasta jos verkkoa ei ole.
const CACHE = 'vuorolaskuri-v4';
const TIEDOSTOT = [
  './', 'index.html', 'manifest.json', 'vuorolista.pdf', 'icon-192.png', 'icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs',
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(TIEDOSTOT)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== CACHE).map(n => caches.delete(n)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.hostname === 'cdnjs.cloudflare.com') {
    // kirjasto ei muutu: välimuisti ensin
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      const kopio = res.clone(); caches.open(CACHE).then(c => c.put(e.request, kopio)); return res;
    })));
    return;
  }
  if (url.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(res => {
    if (res.ok) { const kopio = res.clone(); caches.open(CACHE).then(c => c.put(e.request, kopio)); }
    return res;
  }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
