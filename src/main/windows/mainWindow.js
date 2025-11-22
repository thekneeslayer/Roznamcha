import { BrowserWindow, app } from "electron";
import path from "path";

export default function createMainWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 800,
    title: "Roznamcha",
    webPreferences: {
      preload: path.join(app.getAppPath(), ".vite", "build", "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    }
  });

  // MAIN_WINDOW_VITE_DEV_SERVER_URL is provided by @electron-forge/plugin-vite
  // It's injected as a global variable during development
  const devServerURL = process.env.VITE_DEV_SERVER_URL || (typeof MAIN_WINDOW_VITE_DEV_SERVER_URL !== 'undefined' ? MAIN_WINDOW_VITE_DEV_SERVER_URL : null);
  
  if (devServerURL) {
    console.log("Loading DEV SERVER:", devServerURL);
    win.loadURL(devServerURL);
    win.webContents.openDevTools(); // Open DevTools in development
  } else {
    console.log("Loading PROD FILE");
    win.loadFile(path.join(__dirname, `../renderer/main_window/index.html`));
  }

  return win;
}