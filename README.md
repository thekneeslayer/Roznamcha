# Roznamcha 🔐

A secure, end-to-end encrypted note-taking application built with Electron, React, and modern web technologies.

![Electron](https://img.shields.io/badge/Electron-39.2.3-47848F?style=flat-square&logo=electron)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4.21-646CFF?style=flat-square&logo=vite)


## ✨ Features

- 🔒 **End-to-End Encryption** - AES-256-GCM encryption with PBKDF2 key derivation
- 🎨 **Rich Text Editor** - Powered by TipTap for beautiful note formatting
- 💾 **Local-First** - All data stored locally using IndexedDB (Dexie)
- 🔐 **Secure Keychain** - Credentials stored in system keychain (Keytar)
- ⚡ **Fast & Modern** - Built with Vite for lightning-fast development
- 🖥️ **Cross-Platform** - Works on Windows, macOS, and Linux

## 🚀 Tech Stack

### Core
- **[Electron](https://www.electronjs.org/)** - Desktop application framework
- **[React](https://react.dev/)** - UI library
- **[Vite](https://vitejs.dev/)** - Build tool and dev server

### Security & Encryption
- **Node.js Crypto** - AES-256-GCM encryption
- **[Keytar](https://github.com/atom/node-keytar)** - Secure credential storage
- **[Zod](https://zod.dev/)** - Runtime type validation

### Editor & Storage
- **[TipTap](https://tiptap.dev/)** - Rich text editor
- **[Dexie](https://dexie.org/)** - IndexedDB wrapper for local storage

## 📋 Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher
- **Git** (for cloning the repository)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/roznamcha.git
   cd roznamcha
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

## 📦 Building

### Package the application
```bash
npm run package
```

### Create distributable installers
```bash
npm run make
```

This will create platform-specific installers in the `out/` directory:
- **Windows**: `.exe` installer (Squirrel)
- **macOS**: `.zip` archive
- **Linux**: `.deb` and `.rpm` packages

## 🏗️ Project Structure

```
roznamcha/
├── src/
│   ├── main/                 # Electron main process
│   │   ├── ipc/             # IPC handlers
│   │   │   └── api.js
│   │   ├── modules/         # Core modules
│   │   │   ├── auth.js      # Authentication logic
│   │   │   ├── crypto.js    # Encryption/decryption
│   │   │   ├── keychain.js  # Keychain integration
│   │   │   ├── storage.js   # File system operations
│   │   │   └── sync.js      # Sync functionality
│   │   ├── windows/         # Window management
│   │   │   └── mainWindow.js
│   │   └── main.js          # Main entry point
│   │
│   ├── preload/             # Preload scripts
│   │   └── preload.js       # Context bridge
│   │
│   └── renderer/            # React application
│       ├── db/              # IndexedDB setup
│       │   └── indexedDB.js
│       ├── editor/          # Editor components
│       │   ├── NoteCard.jsx
│       │   ├── NoteView.jsx
│       │   └── TipTapEditor.jsx
│       ├── pages/           # Application pages
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   └── Settings.jsx
│       ├── utils/           # Utility functions
│       │   ├── helpers.js
│       │   └── validators.js
│       ├── App.jsx          # Root component
│       └── main.jsx         # React entry point
│
├── index.html               # HTML template
├── index.css                # Global styles
├── forge.config.js          # Electron Forge configuration
├── vite.main.config.mjs     # Vite config for main process
├── vite.preload.config.mjs  # Vite config for preload
├── vite.renderer.config.mjs # Vite config for renderer
└── package.json             # Dependencies and scripts
```

## 🔐 Security Architecture

### Encryption
- **Algorithm**: AES-256-GCM (Galois/Counter Mode)
- **Key Derivation**: PBKDF2 with SHA-256 (200,000 iterations)
- **Salt**: 128-bit random salt per encryption
- **IV**: 96-bit random initialization vector
- **Authentication**: Built-in authentication tag (GCM)

### Data Flow
```
User Password → PBKDF2 → Encryption Key → AES-256-GCM → Encrypted Note
                  ↓
              System Keychain (Keytar)
```

### Security Features
- ✅ Context isolation enabled
- ✅ Node integration disabled
- ✅ Sandbox enabled
- ✅ Content Security Policy
- ✅ No remote code execution
- ✅ Secure credential storage

## 🎯 Development

### Available Scripts

- `npm start` - Start development server with hot reload
- `npm run package` - Package the application
- `npm run make` - Create distributable installers
- `npm run publish` - Publish to distribution platforms
- `npm run lint` - Run linting (placeholder)

### Hot Reload

The development server supports hot reload for:
- ✅ React components (instant)
- ✅ CSS changes (instant)
- ⚠️ Main process changes (requires restart - type `rs` in terminal)

### Debugging

- **Renderer Process**: DevTools opens automatically in development
- **Main Process**: Use `--inspect` flag or VSCode debugger
  ```bash
  electron --inspect=5858 .
  ```

## 🧪 Testing (Coming Soon)

```bash
npm test
```

## 📝 Roadmap

### Phase 1: Core Functionality ✅
- [x] Electron + React setup
- [x] AES-256-GCM encryption
- [x] Keychain integration
- [x] Basic UI

### Phase 2: Editor (In Progress)
- [ ] TipTap editor integration
- [ ] Note CRUD operations
- [ ] IndexedDB storage
- [ ] Search functionality

### Phase 3: Advanced Features
- [ ] User authentication
- [ ] Note organization (tags, folders)
- [ ] Export/import notes
- [ ] Cloud sync (optional)
- [ ] Dark mode
- [ ] Markdown support

### Phase 4: Polish
- [ ] Keyboard shortcuts
- [ ] Auto-save
- [ ] Note versioning
- [ ] Full-text search
- [ ] Performance optimization

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards
- Use ES6+ features
- Follow existing code style
- Comment complex logic
- Keep components small and focused
- Write meaningful commit messages


## 🙏 Acknowledgments

- [Electron Forge](https://www.electronforge.io/) - Application scaffolding and building
- [TipTap](https://tiptap.dev/) - Extensible rich text editor
- [Dexie](https://dexie.org/) - IndexedDB wrapper
- [Keytar](https://github.com/atom/node-keytar) - System keychain access

## 📧 Contact

**Muhammad A. Jauhar** - muhammad.a.jauhar@gmail.com

Project Link: [https://github.com/YOUR-USERNAME/roznamcha](https://github.com/YOUR-USERNAME/roznamcha)

---

## 🔒 Privacy & Security Notice

Roznamcha is designed with privacy as a top priority:
- 🔐 All notes are encrypted locally using your password
- 💾 No data is sent to any server (local-first)
- 🔑 Encryption keys never leave your device
- 🛡️ Built on proven cryptographic standards (AES-256-GCM)

**Important**: Keep your password safe! There is no password recovery mechanism by design. If you lose your password, your notes cannot be decrypted.

---

<div align="center">
  <strong>Built with ❤️ for privacy-conscious note-takers</strong>
</div>
