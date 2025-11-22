import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";

// Import window creator
import createMainWindow from "./windows/mainWindow.js";

// Import IPC handlers
import registerIPCHandlers from "./ipc/api.js";

// ---- Initialization of Subsystems (Lazy Imports) ----
// These will be used later when you build them
// import { initCrypto } from "./modules/crypto.js";
// import { initAuth } from "./modules/auth.js";
// import { initSync } from "./modules/sync.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Prevent multiple instances
if (!app.requestSingleInstanceLock()) {
  app.quit();
}

// App ready event
app.whenReady().then(() => {
  // ---- Secure App Setup ----
  app.setName("Roznamcha");

  // Disable insecure Electron warnings
  process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";

  // Register IPC handlers
  registerIPCHandlers();

  // Initialize subsystems (later)
  // initCrypto();
  // initAuth();
  // initSync();

  // Create Window
  createMainWindow();

  // macOS behavior
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

// Quit app when all windows are closed (Windows/Linux)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
