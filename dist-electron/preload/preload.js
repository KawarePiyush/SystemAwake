import { contextBridge, ipcRenderer } from "electron";
console.log("PRELOAD LOADED");
contextBridge.exposeInMainWorld("electronAPI", {
    startActivity: () => ipcRenderer.invoke("activity:start"),
    stopActivity: () => ipcRenderer.invoke("activity:stop"),
    getSettings: () => ipcRenderer.invoke("settings:get"),
    setSetting: (key, value) => ipcRenderer.invoke("settings:set", key, value),
    showNotification: (title, body) => ipcRenderer.invoke("notification:show", title, body),
});
