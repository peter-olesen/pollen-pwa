const staticCacheName = 'site-static-v1.1';
const siteDynamicCacheName = 'site-dynamic-v1.0';

const assets = [
    '/',
    '/index.html',
    './assets/css/styles.css'
]


// Service Worker Registration
if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(reg => console.log('Service Worker Registered'))
    .catch(err => console.log('Service Worker Error:', err))
}

// Service Worker Installation
self.addEventListener('install', event => {
    console.log('Service Worker Installed');
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('Service Worker Caching Files');
            cache.addAll(assets);
        })
    )
})

// Service Worker Activated
self.addEventListener('activated', event => {
    console.log('Service Worker Activated');
})

// Service Worker Fetch
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(async cacheResult => {
            return (
                cacheResult ||
                fetch(event.request).then(async fetchResult => {
                    return caches.open(siteDynamicCacheName).then(cache => {
                        cache.put(event.request.url, fetchResult.clone())
                        return fetchResult
                    })
                })
            )
        })
    )
})