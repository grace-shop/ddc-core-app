// Laméssin — service worker : l'application fonctionne sans internet
const CACHE = "ddc-core-v35";
const CORE = [
  "./", "index.html", "css/style.css", "js/app.js", "js/data.js", "js/art.js", "js/body3d.js", "js/ai.js", "js/voice.js", "js/features.js", "js/icons.js", "js/bg.js", "js/analyze.js", "js/urgent.js", "js/knowledge.js", "js/update.js", "js/version.js", "js/config.js", "js/services.js", "js/i18n.js",
  "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  if (!req.url.startsWith(self.location.origin) && !req.url.includes("fonts.g")) return; // API IA : jamais en cache
  // Réseau d'abord pour avoir les mises à jour, cache si hors ligne
  e.respondWith(
    // « no-cache » : le navigateur vérifie toujours auprès du serveur qu'il a la dernière version
    (req.url.startsWith(self.location.origin) ? fetch(req.mode === "navigate" ? req.url : new Request(req, { cache: "no-cache" }), { cache: "no-cache" }) : fetch(req))
      .then((res) => {
        if (res.ok && (req.url.startsWith(self.location.origin) || req.url.includes("fonts.g"))) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req).then((r) => r || caches.match("index.html")))
  );
});
