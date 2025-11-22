import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  ping: () => ipcRenderer.invoke("app:ping"),

  // crypto
  generateSalt: () => ipcRenderer.invoke("crypto:generateSalt"),
  encrypt: (plaintext, password) =>
    ipcRenderer.invoke("crypto:encrypt", { plaintext, password }),
  decrypt: (payload, password) =>
    ipcRenderer.invoke("crypto:decrypt", { payload, password }),
  sha256: (data) => ipcRenderer.invoke("crypto:hash", { data }),
  
  // will add crypto, auth, sync later
});
