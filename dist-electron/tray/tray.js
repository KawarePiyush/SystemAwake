import { Tray, Menu, app, } from "electron";
import activityService from "../services/activity.service.js";
import { getAssetPath } from "../utils/paths.js";
let tray = null;
export const createTray = (mainWindow) => {
    const iconPath = getAssetPath("tray-icon.ico");
    console.log("TRAY ICON:", iconPath);
    tray = new Tray(iconPath);
    const contextMenu = Menu.buildFromTemplate([
        {
            label: "Show App",
            click: () => {
                mainWindow.show();
            },
        },
        {
            label: "Start Activity",
            click: () => {
                activityService.start();
            },
        },
        {
            label: "Stop Activity",
            click: () => {
                activityService.stop();
            },
        },
        {
            type: "separator",
        },
        {
            label: "Quit",
            click: () => {
                app.quit();
            },
        },
    ]);
    tray.setToolTip("System Awake");
    tray.setContextMenu(contextMenu);
    tray.on("double-click", () => {
        mainWindow.show();
    });
};
