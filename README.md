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
git clone <repository-url>
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

```bash
npm run build
```

---

# Start Production Build

```bash
npm start
```

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

Recommended packaging tool:

- electron-builder

Future production packaging includes:

- Windows installer
- App signing
- Auto updates
- Startup integration
- Native notification branding

---

# Troubleshooting

## Tray Icon Not Appearing

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