/*Catching*/
// Making the array of files that will be added to the cache storage
const files = [
    '/package-lock.json',
    '/package.json',
    '/public/favicon.ico',
    '/public/index.html',
    '/public/manifest.json',
    '/src/App.css',
    '/src/App.js',
    '/src/App.test.js',
    '/src/index.css',
    '/src/index.js',
    '/src/logo.svg',
    '/src/registerSW.js',
    '/src/Components/Map.js',
    '/src/Components/NavBar.js',
    '/src/Components/SideBar.js'
]


// Adding event listener to install all the files into the cache storage after it is opened
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('udacity-project-7').then(function(cache) {
            return cache.addAll(files);
        })
    );
});


/*Fetching*/
// Checking to see if response is found when going though app. If not, will fetch the request that was not found.
self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            if(response) {
                console.log('Found Response!');
                return response;
            } else {
                console.log('Could Not Find Response! Getting ', e.request, ' Now!');
                return fetch(e.request).then(function(response) {
                    var responseClone = response.clone();
                    caches.open('udacity-project-7').then(function(cache) {
                        cache.put(e.request, responseClone);
                    });
                    return response;
                });
            }
        })
    );
});
