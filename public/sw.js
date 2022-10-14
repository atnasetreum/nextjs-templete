self.addEventListener('install', (e) => {
  const install = new Promise(async (resolve) => {
    console.log('[SW] installing ...');
    await self.skipWaiting();
    resolve();
  });
  e.waitUntil(install);
});

self.addEventListener('activate', () => {
  console.log('[SW] activate, control app ...');
});

// self.addEventListener('fetch', (e) => {
//   console.log('[SW] fetch:', e.request.url);
// });

// self.addEventListener('sync', () => {
//   console.log('[SW] sync connected...');
// });

self.addEventListener('push', (e) => {
  console.log('[SW] push received...');
  const { title, body } = JSON.parse(e.data.text());

  const options = {
    body,
    // icon: 'img/icons/icon-72x72.png',
    //////////////icon: `img/avatars/${data.usuario}.jpg`,
    badge: 'img/favicon.ico',
    image:
      'https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/5/5b/Torre_de_los_Avengers.png/revision/latest?cb=20150626220613&path-prefix=es',
    vibrate: [
      125, 75, 125, 275, 200, 275, 125, 75, 125, 275, 200, 600, 200, 600,
    ],
  };

  e.waitUntil(self.registration.showNotification(title, options));
});
