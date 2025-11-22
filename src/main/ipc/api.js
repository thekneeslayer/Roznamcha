import { ipcMain } from "electron";
import {
  encryptString,
  decryptObject,
  sha256Hex,
  generateSalt
} from "../modules/crypto.js";

export default function registerIPCHandlers() {
  console.log("IPC Handlers Registered");

  ipcMain.handle("app:ping", () => "pong");

  ipcMain.handle("crypto:generateSalt", () => {
    return generateSalt();
  });

    // encrypt: { plaintext, password }
  ipcMain.handle("crypto:encrypt", async (_, { plaintext, password }) => {
    if (typeof plaintext !== "string" || typeof password !== "string") {
      throw new Error("Invalid args for crypto:encrypt");
    }
    // Keep this minimal - do not log passwords
    const payload = await encryptString(plaintext, password);
    return payload; // JSON-friendly with base64 fields
  });

  // decrypt: { payload, password }
  ipcMain.handle("crypto:decrypt", async (_, { payload, password }) => {
    if (!payload || typeof password !== "string") {
      throw new Error("Invalid args for crypto:decrypt");
    }
    const plaintext = await decryptObject(payload, password);
    return plaintext;
  });

  // hash: { data }
  ipcMain.handle("crypto:hash", (_, { data }) => {
    return sha256Hex(data);
  });


  // Later you will add:
  // ipcMain.handle("auth:login", ...)
  // ipcMain.handle("crypto:encrypt", ...)
  // ipcMain.handle("crypto:decrypt", ...)
  // ipcMain.handle("notes:save", ...)
  // ipcMain.handle("sync:run", ...)
}
