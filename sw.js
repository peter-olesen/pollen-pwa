if ('serviceWorker' in navigator) {
    window.addEventListener('load',  () => {
        navigator.serviceWorker
        // .register('sw_cached_pages.js') // Cached defined pages in array
        .register('sw_cached_site.js') // Caches the entire site
        .then(reg => console.log('Service Worker: Registered'))
        .catch(err => console.log(`Service Worker: Error: ${err}`))
    })
};