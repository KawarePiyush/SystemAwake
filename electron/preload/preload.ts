import { contextBridge, ipcRenderer } from "electron";

console.log("PRELOAD LOADED");

contextBridge.exposeInMainWorld("electronAPI", {
  startActivity: () => ipcRenderer.invoke("activity:start"),

  stopActivity: () => ipcRenderer.invoke("activity:stop"),

  getSettings: () => ipcRenderer.invoke("settings:get"),

  setSetting: (key: string, value: unknown) =>
    ipcRenderer.invoke("settings:set", key, value),

  showNotification: (title: string, body: string) =>
    ipcRenderer.invoke("notification:show", title, body),
});
