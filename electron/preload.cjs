// Student's Class — minimal preload: exposes update helpers to the web UI.
// No Node access is leaked to the page; only these two async functions.
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("SCAPI", {
  checkUpdates: () => ipcRenderer.invoke("sc-check-updates"),
  appVersion: () => ipcRenderer.invoke("sc-app-version"),
  onUpdateResult: (cb) => ipcRenderer.on("sc-update-result", (_e, data) => cb(data))
});
