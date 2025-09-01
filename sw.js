const CACHE_NAME = 'elegance-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/app.js',
    '/js/data.js',
    '/favicon.png',
    '/img/bolso-piel.jpg',
    '/img/camisa-lino.jpg',
    '/img/chaqueta-cuero.jpg',
    '/img/gorra-clasica.jpg',
    '/img/jeans.jpg',
    '/img/pants-deportivos.jpg',
    '/img/sudadera.jpg',
    '/img/tenis-urbanos.jpg',
    '/img/vestido-floral.jpg',
    '/img/zapatos-tacon.jpg',
    '/img/vestido-floral-1.jpg',
    '/img/vestido-floral-2.jpg',
    '/img/vestido-floral-3.jpg',
    '/img/chaqueta-cuero-1.jpg',
    '/img/chaqueta-cuero-2.jpg',
    '/img/pants-deportivos-1.jpg',
    '/img/bolso-piel-1.jpg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cacheando archivos estáticos...');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});