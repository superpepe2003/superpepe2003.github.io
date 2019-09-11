const CACHE_NAME = 'v1_cache_programador_fitness',
    urlsToCache = [
        './',
        './estilo.css',
        './script.js',
        './img/agus.jpg',
        './img/icono144x144.png',
        './img/icono255x255.png',
        './img/perro.jpg'
    ]

//durante la fase de instalacion generalmente se almacena
//en cache los archivos estaticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
                .then(() => self.skipWaiting())
        })
        .catch(err => console.log("Fallo registro de cache", err))
    )
})

//una vez que se instala el SW, se activa y busca 
//los recursos para hacer que funcione sin conexion
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
        .then(cachesNames => {
            cachesNames.map(cacheName => {
                //eliminamos lo que ya no se necesita en cache
                if (cacheWhitelist.indexOf(cacheName) === -1) {
                    return caches.delete(cacheName)
                }
            })
        })
        .then(() => self.clients.claim())
    )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
    //Responder ya sea con el objeto en cache o continuar y 
    //buscar la url real
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if (res) {
                //recuperar del cache
                return res
            }

            //recuperar la peticion de url
            return fetch(e.request)
        })
    )
})