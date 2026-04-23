const CACHE_NAME = "carzone-v6";

const urlsToCache = [
    "./",
    "./index.html",
    "./cars.html",
    "./compare.html",
    "./contact.html",
    "./blog.html",
    "./audi.html",
    "./bmw.html",
    "./mercedes.html",
    "./tesla.html",
    "./toyota.html",
    "./mahindra.html",
    "./css/style.css",
    "./js/script.js",
    "./image/optimized/home-hero.jpg",
    "./image/optimized/audi-card.jpg",
    "./image/optimized/bmw-card.jpg",
    "./image/optimized/mercedes-card.jpg",
    "./image/optimized/tesla-card.jpg",
    "./image/optimized/toyota-card.jpg",
    "./image/optimized/mahindra-card.jpg",
    "./image/audi.webp",
    "./image/bmw.webp",
    "./image/mercedes.webp",
    "./image/tesla.webp",
    "./image/toyota.webp",
    "./image/mahindra.webp"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
    );

    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => Promise.all(
            keys
                .filter((key) => key !== CACHE_NAME)
                .map((key) => caches.delete(key))
        ))
    );

    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request)
                .then((networkResponse) => {
                    if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
                        return networkResponse;
                    }

                    const responseClone = networkResponse.clone();

                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });

                    return networkResponse;
                })
                .catch(() => caches.match("./index.html"));
        })
    );
});
