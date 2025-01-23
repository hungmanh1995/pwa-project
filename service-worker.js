const CACHE_NAME = 'attendance-system-cache-v3';
const urlsToCache = [
  '/pwa-project/',  // Đảm bảo đúng thư mục gốc của PWA
  '/pwa-project/index.html',
  '/pwa-project/styles.css',  // Đúng đường dẫn tới file CSS
  '/pwa-project/script.js',
  '/pwa-project/manifest.json',
  '/pwa-project/icons/icon-192x192.png',
  '/pwa-project/icons/icon-512x512.png',
  '/pwa-project/icons/favicon.ico'  // Đúng đường dẫn tới favicon
];

// Install Service Worker và cache các tài nguyên
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching essential files...');
      return cache.addAll(urlsToCache);
    })
  );
});

// Aktivating và dọn dẹp các cache cũ
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log(`Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Xử lý yêu cầu tài nguyên và phục vụ từ cache nếu có
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Nếu tìm thấy trong cache, trả về từ cache, nếu không, lấy từ mạng
      if (response) {
        console.log(`Serving from cache: ${event.request.url}`);
        return response;
      }

      // Nếu không có trong cache, fetch từ mạng
      console.log(`Fetching from network: ${event.request.url}`);
      return fetch(event.request)
        .then((networkResponse) => {
          // Lưu tài nguyên vào cache để phục vụ các lần sau
          if (event.request.url.startsWith(self.location.origin)) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        });
    }).catch((error) => {
      console.error('Fetch failed; returning offline page.', error);
      return caches.match('/index.html'); // Trả về trang offline nếu không có mạng
    })
  );
});
