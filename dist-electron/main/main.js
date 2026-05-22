import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import activityService from "../services/activity.service.js";
import { createTray } from "../tray/tray.js";
import settingsService from "../services/settings.service.js";
import startupService from "../services/startup.service.js";
import notificationService from "../services/notification.service.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const preloadPath = path.join(__dirname, "../preload/preload.js");
let mainWindow = null;
let isQuitting = false;
const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 1000,
        minHeight: 700,
        icon: path.join(process.cwd(), "assets", "tray-icon.ico"),
        webPreferences: {
            preload: preloadPath,
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false,
        },
    });
    if (process.env.VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    }
    else {
        mainWindow.loadFile(path.join(__dirname, "../../dist/index.html"));
    }
    mainWindow.on("close", (event) => {
        if (!isQuitting) {
            event.preventDefault();
            mainWindow?.hide();
        }
    });
};
app.on("before-quit", () => {
    isQuitting = true;
});
app.whenReady().then(() => {
    createWindow();
    mainWindow?.webContents.openDevTools();
    // console.log("PRELOAD PATH:", preloadPath);
    if (mainWindow) {
        createTray(mainWindow);
        const autoStart = settingsService.get("autoStart");
        if (autoStart) {
            activityService.start();
            mainWindow?.hide();
            console.log("Auto activity started");
        }
    }
    mainWindow?.webContents.on("did-fail-load", (_, code, desc) => {
        console.log("LOAD FAILED", code, desc);
    });
    ipcMain.handle("activity:start", async () => {
        activityService.start();
    });
    ipcMain.handle("activity:stop", async () => {
        activityService.stop();
    });
    ipcMain.handle("settings:get", async () => {
        return settingsService.getAll();
    });
    ipcMain.handle("settings:set", async (_, key, value) => {
        settingsService.set(key, value);
        if (key === "launchOnStartup") {
            if (value) {
                startupService.enable();
            }
            else {
                startupService.disable();
            }
        }
    });
    ipcMain.handle("notification:show", async (_, title, body) => {
        notificationService.show(title, body);
    });
});
