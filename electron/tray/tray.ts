import {
  Tray,
  Menu,
  app,
  BrowserWindow,
} from "electron";

import path from "path";


import activityService from "../services/activity.service.js";




let tray: Tray | null = null;

export const createTray = (
  mainWindow: BrowserWindow
) => {
const iconPath = path.join(
  process.cwd(),
  "assets",
  "tray-icon.ico"
);

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