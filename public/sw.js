// Zorko Jiyanpur Service Worker — PWA + Push Notifications
const CACHE = 'zorko-cache-v1';
const OFFLINE_ASSETS = ['/', '/manifest.json'];

// Install — cache essential assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(OFFLINE_ASSETS))
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — network-first strategy (skip API routes)
self.addEventListener('fetch', (e) => {
  if (e.request.url.includes('/api/')) return;
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

// Push — show notification
self.addEventListener('push', (e) => {
  let data = { title: 'Zorko Jiyanpur 🍔', body: 'New update from Zorko!' };
  try { data = e.data ? e.data.json() : data; } catch (_) {}

  const options = {
    body: data.body || 'Check it out!',
    icon: data.icon || 'https://ik.imagekit.io/DEMOPROJECT/b9e93af6-869f-444a-9940-7d87a43b6b45.png',
    badge: 'https://ik.imagekit.io/DEMOPROJECT/b9e93af6-869f-444a-9940-7d87a43b6b45.png',
    vibrate: [200, 100, 200],
    tag: 'zorko-offer',
    renotify: true,
    requireInteraction: false,
    data: { url: data.url || '/' }
  };

  e.waitUntil(self.registration.showNotification(data.title || 'Zorko Jiyanpur 🍔', options));
});

// Notification click — open app
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = e.notification.data?.url || '/';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
