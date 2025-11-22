// src/renderer/App.jsx
import React, { useEffect, useState } from "react";

export default function App() {
  const [log, setLog] = useState([]);
  const [password, setPassword] = useState("");
  const [showDemo, setShowDemo] = useState(false);

  const runCryptoDemo = async () => {
    try {
      const pong = await window.api.ping();
      console.log("Ping:", pong);

      const salt = await window.api.generateSalt();
      console.log("salt:", salt);

      if (!password) {
        setLog(["Please enter a password first!"]);
        return;
      }

      const plaintext = "Hello Roznamcha — this is a test note.";
      const enc = await window.api.encrypt(plaintext, password);
      console.log("Encrypted object:", enc);

      const dec = await window.api.decrypt(enc, password);
      console.log("Decrypted text:", dec);

      const hash = await window.api.sha256(enc.ciphertext);
      console.log("SHA-256 of ciphertext:", hash);

      setLog([
        `✓ Ping: ${pong}`,
        `✓ Salt generated: ${salt.slice(0, 16)}...`,
        `✓ Original: ${plaintext}`,
        `✓ Decrypted: ${dec}`,
        `✓ Hash: ${hash.slice(0, 16)}...`,
        `\n✅ All crypto operations successful!`
      ]);
    } catch (error) {
      setLog([`❌ Error: ${error.message}`]);
      console.error("Crypto demo error:", error);
    }
  };

  return (
    <div style={{ 
      padding: 40, 
      maxWidth: 800, 
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ color: '#2563eb' }}>🔐 Roznamcha — Crypto Demo</h1>
      
      <div style={{ 
        background: '#f8fafc', 
        padding: 20, 
        borderRadius: 8,
        marginTop: 20,
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ marginTop: 0 }}>Test Encryption</h3>
        <p style={{ color: '#64748b', fontSize: 14 }}>
          This demo tests the E2EE crypto module with AES-256-GCM encryption.
        </p>
        
        <div style={{ marginTop: 15 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
            Test Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a test password"
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #cbd5e1',
              borderRadius: 6,
              fontSize: 14,
              boxSizing: 'border-box'
            }}
          />
        </div>
        
        <button
          onClick={runCryptoDemo}
          disabled={!password}
          style={{
            marginTop: 15,
            padding: '10px 20px',
            background: password ? '#2563eb' : '#94a3b8',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: password ? 'pointer' : 'not-allowed',
            fontWeight: 500,
            fontSize: 14
          }}
        >
          Run Crypto Test
        </button>
      </div>

      {log.length > 0 && (
        <div style={{
          marginTop: 20,
          background: '#0f172a',
          color: '#e2e8f0',
          padding: 20,
          borderRadius: 8,
          fontFamily: 'monospace',
          fontSize: 13,
          lineHeight: 1.6
        }}>
          <div style={{ 
            color: '#94a3b8', 
            marginBottom: 10,
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: 1
          }}>
            Console Output:
          </div>
          {log.map((line, i) => (
            <div key={i} style={{ marginBottom: 4 }}>
              {line}
            </div>
          ))}
        </div>
      )}

      <div style={{ 
        marginTop: 20, 
        padding: 15, 
        background: '#fef3c7',
        border: '1px solid #fbbf24',
        borderRadius: 6,
        fontSize: 13
      }}>
        <strong>⚠️ Development Mode:</strong> Open DevTools (Ctrl+Shift+I) to see detailed logs. 
        Never log passwords in production!
      </div>
    </div>
  );
}