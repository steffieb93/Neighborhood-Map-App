export default function registerSW() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
        .register('/serviceworker.js', {scope: '/'})
        .then(function(success) {
            console.log('Service Worker Registered!'); // Will log on console if service worker is registered
        })
        .catch(function(err) {
            console.error(err); // Will have error message on console if service worker is NOT registered
        });
    }
}
