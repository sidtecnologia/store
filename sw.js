const CACHE_NAME = 'elegance-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/data.js',
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
    '/favicon.png',
    // Puedes añadir las demás imágenes aquí
];

// Instala el Service Worker y cachea los archivos
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cacheando archivos estáticos');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activa el Service Worker y borra cachés antiguas
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

// Intercepta las peticiones de red y sirve desde la caché si está disponible
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si el archivo está en caché, lo devuelve
                if (response) {
                    return response;
                }
                // Si no, lo busca en la red
                return fetch(event.request);
            })
    );
});