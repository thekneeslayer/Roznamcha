// src/main/modules/crypto.js
import crypto from "crypto";

/**
 * Crypto module
 * - PBKDF2 (SHA-256) -> 32 byte key (AES-256)
 * - AES-256-GCM
 * - Returns JSON-friendly base64 fields
 */

const DEFAULT_PBKDF2_ITER = 200_000; // adjust if needed (see notes)
const SALT_BYTES = 16; // 128-bit salt
const IV_BYTES = 12; // recommended for GCM

function randomBytes(n) {
  return crypto.randomBytes(n);
}

export function generateSalt() {
  return randomBytes(SALT_BYTES).toString("base64");
}

/**
 * Derive a 32-byte key from password + salt.
 * @param {string} password
 * @param {string} saltBase64
 * @param {number} iterations
 * @returns {Buffer} key (32 bytes)
 */
export function deriveKey(password, saltBase64, iterations = DEFAULT_PBKDF2_ITER) {
  const salt = Buffer.from(saltBase64, "base64");
  const key = crypto.pbkdf2Sync(
    Buffer.from(password, "utf8"),
    salt,
    iterations,
    32,
    "sha256"
  );
  // caller must zero the key buffer when done
  return key;
}

/**
 * Encrypt plaintext (utf8 string).
 * Returns object { version, salt, iv, ciphertext, tag, iterations } - all base64
 * @param {string} plaintext
 * @param {string} password
 * @param {object} opts
 */
export async function encryptString(plaintext, password, opts = {}) {
  const iterations = opts.iterations ?? DEFAULT_PBKDF2_ITER;
  const salt = opts.salt ?? generateSalt();
  const iv = randomBytes(IV_BYTES);
  const key = deriveKey(password, salt, iterations);

  try {
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
    const ciphertext = Buffer.concat([
      cipher.update(Buffer.from(plaintext, "utf8")),
      cipher.final()
    ]);
    const tag = cipher.getAuthTag();

    return {
      version: 1,
      salt: salt, // base64
      iv: iv.toString("base64"),
      ciphertext: ciphertext.toString("base64"),
      tag: tag.toString("base64"),
      iterations
    };
  } finally {
    // zero the key material
    try { key.fill(0); } catch (e) {}
  }
}

/**
 * Decrypt object created by encryptString.
 * Input fields are base64 strings.
 * @param {object} payload
 * @param {string} password
 * @returns {string} plaintext
 */
export async function decryptObject(payload, password) {
  const { salt, iv, ciphertext, tag, iterations } = payload;
  if (!salt || !iv || !ciphertext || !tag) {
    throw new Error("Malformed encrypted payload");
  }

  const key = deriveKey(password, salt, iterations);

  try {
    const decipher = crypto.createDecipheriv(
      "aes-256-gcm",
      key,
      Buffer.from(iv, "base64")
    );
    decipher.setAuthTag(Buffer.from(tag, "base64"));
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(ciphertext, "base64")),
      decipher.final()
    ]);
    return decrypted.toString("utf8");
  } finally {
    try { key.fill(0); } catch (e) {}
  }
}

/**
 * Compute SHA-256 hash of input (string or Buffer).
 * Returns hex string.
 */
export function sha256Hex(input) {
  const h = crypto.createHash("sha256");
  if (typeof input === "string") h.update(Buffer.from(input, "utf8"));
  else h.update(input);
  return h.digest("hex");
}
