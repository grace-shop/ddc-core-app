// Laméssin — pont sécurisé entre la page et l'ordinateur (mise à jour en un clic)
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("ddcDesktop", {
  update: (url) => ipcRenderer.invoke("ddc-update", url),
  onProgress: (cb) => ipcRenderer.on("ddc-update-progress", (_e, pct) => cb(pct)),
});
