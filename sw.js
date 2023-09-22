const CACHE_NAME = 'Version-1';
const UrlToCache = ['index.html', 'offline.html', './Vector_Logo.png', './icons8-wi-fi-disconnected-94.png', './VUDU-HDX-Weekend-Sale-Friday-the-13th.jpg'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(UrlToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Serve cached resources if available, or fetch from the network
        return response || fetch(event.request).then((fetchResponse) => {
          // Cache the fetched resource for future use
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        }).catch(() => caches.match('offline.html')); // Serve the offline page if network request fails
      })
  );
});

  

// self.addEventListener('activate',(event)=>{
//  const CacheswhiteList =[]
//  CacheswhiteList.push(CACHE_NAME)

//  event.waitUntil(
//     caches.keys().then((cachenames)=>{
//         Promise.all(
//             cachenames.map((cachename)=>{
//                 if(!CacheswhiteList.includes(cachename)){
//                     caches.delete(cachename)
//                 }
//             })
//         )
    
//  }))
// })