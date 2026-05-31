# Teams Awake Pro

A production-ready Windows desktop utility built with Electron, React, and TypeScript to keep your system active, maintain availability status in communication tools, monitor battery health, and provide smart desktop automation.

---

# Features

## Activity Automation
- Simulates realistic mouse movement
- Optional keyboard simulation support
- Randomized movement intervals for human-like behavior
- Background automation engine
- Auto start activity mode
- Minimize to tray support

## Tray Application
- Runs silently in Windows system tray
- Hide to tray on close
- Quick tray actions:
  - Show App
  - Start Activity
  - Stop Activity
  - Quit Application

## Persistent Settings
- Saves settings locally using electron-store
- Settings persist after restart
- Fully typed settings architecture

## Battery Monitoring
- Detect charging state
- Monitor battery percentage
- Voice alerts when battery is low
- Desktop notifications for low battery warnings

## Desktop Notifications
- Native Electron desktop notifications
- Speech synthesis support
- Human-like voice support using Windows neural voices

## Modern Desktop Architecture
- Electron + React + TypeScript
- Secure preload bridge
- IPC communication
- Modular service architecture
- Production-ready folder structure

---

# Tech Stack

## Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

## Desktop Runtime
- Electron

## Automation
- @nut-tree-fork/nut-js

## Persistence
- electron-store

---

# Project Structure

```txt
teams-awake-pro/
│
├── assets/
│   ├── tray-icon.ico
│   └── logo.png
│
├── electron/
│   ├── main/
│   │   └── main.ts
│   │
│   ├── preload/
│   │   └── preload.ts
│   │
│   ├── services/
│   │   ├── activity.service.ts
│   │   ├── notification.service.ts
│   │   ├── settings.service.ts
│   │   └── startup.service.ts
│   │
│   └── tray/
│       └── tray.ts
│
├── src/
│   ├── hooks/
│   │   └── useBattery.ts
│   │
│   ├── types/
│   │   ├── battery.d.ts
│   │   ├── electron.d.ts
│   │   └── settings.ts
│   │
│   ├── utils/
│   │   └── speak.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/KawarePiyush/SystemAwake.git
cd teams-awake-pro
```

---

# Install Dependencies

```bash
npm install
```

---

# Run Development Server

```bash
npm run dev
```

This starts:
- React frontend
- Electron desktop runtime

---

# Build Application

Compile the React UI and Electron main process (without creating an installer):

```bash
npm run build
```

This generates:

- `dist/` — production React build
- `dist-electron/` — compiled Electron main/preload/services

---

# Create Windows EXE (Installer)

Build a distributable Windows installer using `electron-builder`:

```bash
npm run dist
```

This command:

1. Runs `npm run build` (Vite + TypeScript)
2. Packages the app with `electron-builder`
3. Creates a Windows NSIS installer

### Before building

- Close any running **System Awake** window or tray instance
- If a previous build is still open, the build may fail with a file lock error on `release/`

### Where to find the output

After a successful build, files are created in the **`release/`** folder at the project root:

| File / folder | Purpose |
|---|---|
| `release/System Awake Setup 0.0.0.exe` | **Windows installer** — share this with users |
| `release/System Awake Setup 0.0.0.exe.blockmap` | Update metadata used by electron-builder |
| `release/win-unpacked/System Awake.exe` | Portable/unpacked app — useful for quick local testing |
| `release/win-unpacked/` | Full unpacked app folder (no install step) |

> The installer filename includes the version from `package.json` (currently `0.0.0`). When you bump the version, the setup file name will change accordingly.

### Install and run

1. Double-click **`release/System Awake Setup 0.0.0.exe`**
2. Follow the installer (you can choose the install directory)
3. Launch **System Awake** from the Start menu or desktop shortcut

### Test without installing

Run the unpacked build directly:

```bash
release/win-unpacked/System Awake.exe
```

Or open that file from File Explorer.

---

# Application Workflow

## Auto Activity Flow

1. Application launches
2. Tray icon initializes
3. User enables Auto Start
4. Activity engine starts automatically
5. Mouse/keyboard simulation keeps system active

---

# Settings

| Setting | Description |
|---|---|
| movementIntervalMin | Minimum automation interval |
| movementIntervalMax | Maximum automation interval |
| autoStart | Automatically start activity engine |
| keyboardSimulation | Simulate keyboard presses |
| minimizeToTray | Hide app to tray on close |
| launchOnStartup | Launch app with Windows |

---

# Security Architecture

## Electron Security

The application uses:

- contextIsolation: true
- nodeIntegration: false
- secure preload bridge
- IPC communication layer

This prevents direct Node.js access from the renderer process.

---

# Battery Monitoring

The application uses:

```ts
navigator.getBattery()
```

Features:
- Charging state detection
- Battery percentage monitoring
- Voice alerts
- Desktop notifications

---

# Speech System

Uses:

```ts
speechSynthesis
```

Supports:
- Windows neural voices
- Human-like speech output
- Custom voice selection

---

# Tray Behavior

Closing the window does not quit the application.

Instead:
- Window hides
- Tray remains active
- Background services continue running

To fully exit:

```txt
Tray → Quit
```

---

# Recommended Windows Configuration

## Install Additional Voices

Windows Settings:

```txt
Time & Language
→ Speech
→ Voices
```

Recommended:
- English (US)
- English (India)
- Neural voices

---

# Development Notes

## TypeScript

The project uses strict TypeScript configuration.

Avoid:

```ts
any
```

Use shared interfaces and typed IPC communication.

---

# Future Enhancements

Potential upcoming features:

- Windows toast notifications
- Auto updates
- Analytics dashboard
- CPU and RAM monitoring
- Scheduled automation
- Productivity tracking
- AI voice assistant
- Multi-monitor support
- Theme customization
- Cloud sync
- Plugin architecture

---

# Packaging

This project uses **electron-builder** for Windows packaging.

- **Build command:** `npm run dist`
- **Output directory:** `release/`
- **Installer type:** NSIS (custom install path supported)

See [Create Windows EXE (Installer)](#create-windows-exe-installer) for full steps.

---

# Troubleshooting

## Build Fails (file in use)

If you see an error like `The process cannot access the file because it is being used by another process`:

1. Quit **System Awake** from the tray (Tray → Quit)
2. Close any `System Awake.exe` still running in Task Manager
3. Run `npm run dist` again

---

Use:

```txt
.ico
```

instead of PNG for Windows tray support.

---

## Preload Not Working

Verify:

```ts
contextIsolation: true
sandbox: false
```

and ensure preload path is correct.

---

## Mouse Not Moving

Run terminal as Administrator if required.

Some enterprise systems restrict automation permissions.

---

# License

MIT License

---

# Author

Developed by Piyush Kaware

Automobile Engineer turned Software Developer passionate about building useful productivity and automation tools.

---

# Disclaimer

This application is intended for productivity automation and personal desktop utility purposes