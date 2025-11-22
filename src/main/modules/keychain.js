// src/main/modules/keychain.js
import keytar from "keytar";

const SERVICE = "Roznamcha";
export async function storeValue(keyName, value) {
  // stores under account = keyName
  return keytar.setPassword(SERVICE, keyName, value);
}
export async function getValue(keyName) {
  return keytar.getPassword(SERVICE, keyName);
}
export async function deleteValue(keyName) {
  return keytar.deletePassword(SERVICE, keyName);
}
