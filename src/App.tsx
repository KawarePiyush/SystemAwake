import { useState, useEffect } from "react";
import type { Settings } from "./types/settings";
import { useBattery } from "./hooks/useBattery";
import { speak } from "./utils/speak";

function App() {
  const [running, setRunning] = useState(false);

  const [settings, setSettings] = useState<Settings | null>(null);
  const battery = useBattery();

  const updateSetting = async <K extends keyof Settings>(
    key: K,
    value: Settings[K],
  ) => {
    if (!settings) return;

    const updated = {
      ...settings,
      [key]: value,
    };

    setSettings(updated);

    await window.electronAPI.setSetting(key, value);
  };

  const start = async () => {
    await window.electronAPI.startActivity();
    setRunning(true);
  };

  const stop = async () => {
    await window.electronAPI.stopActivity();
    setRunning(false);
  };

  useEffect(() => {
    const loadSettings = async () => {
      const data = await window.electronAPI.getSettings();

      setSettings(data);

      if (data.autoStart) {
        setRunning(true);
      }
    };

    loadSettings();
  }, []);

  useEffect(() => {
    if (!battery) return;

    if (battery.level <= 30 && !battery.charging) {
      speak(
  "Battery is low. Please plug in the charger."
);

       window.electronAPI.showNotification(
      "Low Battery",
      `Battery is below ${battery.level}%. Please plug in the charger.`
    );
    }
  }, [battery]);

  if (!settings) {
    return (
      <div className="h-screen bg-zinc-950 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">System Awake Pro</h1>

        <div className="bg-zinc-900 rounded-2xl p-6 shadow-xl mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Activity Status</h2>

            <span
              className={`font-bold ${
                running ? "text-green-500" : "text-red-500"
              }`}
            >
              {running ? "ACTIVE" : "STOPPED"}
            </span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={start}
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl"
            >
              Start
            </button>

            <button
              onClick={stop}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl"
            >
              Stop
            </button>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 shadow-xl mb-6">
          <h2 className="text-2xl font-semibold mb-6">Settings</h2>

          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <span>Launch On Startup</span>

              <input
                type="checkbox"
                checked={settings.launchOnStartup}
                onChange={(e) =>
                  updateSetting("launchOnStartup", e.target.checked)
                }
              />
            </div>

            <div>
              <label className="block mb-2">Min Interval (seconds)</label>

              <input
                type="number"
                value={settings.movementIntervalMin}
                onChange={(e) =>
                  updateSetting("movementIntervalMin", Number(e.target.value))
                }
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2">Max Interval (seconds)</label>

              <input
                type="number"
                value={settings.movementIntervalMax}
                onChange={(e) =>
                  updateSetting("movementIntervalMax", Number(e.target.value))
                }
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3"
              />
            </div>

            <div className="flex items-center justify-between">
              <span>Keyboard Simulation</span>

              <input
                type="checkbox"
                checked={settings.keyboardSimulation}
                onChange={(e) =>
                  updateSetting("keyboardSimulation", e.target.checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <span>Auto Start</span>

              <input
                type="checkbox"
                checked={settings.autoStart}
                onChange={(e) => updateSetting("autoStart", e.target.checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <span>Minimize To Tray</span>

              <input
                type="checkbox"
                checked={settings.minimizeToTray}
                onChange={(e) =>
                  updateSetting("minimizeToTray", e.target.checked)
                }
              />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 shadow-xl mb-6">
          <h2 className="text-2xl font-semibold mb-4">Battery Status</h2>

          <div className="flex items-center justify-between">
            <span>Battery Level</span>

            <span
              className={`font-bold ${
                battery && battery.level <= 30
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {battery?.level ?? "--"}%
            </span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span>Charging</span>

            <span
              className={`font-bold ${
                battery?.charging ? "text-green-500" : "text-yellow-500"
              }`}
            >
              {battery?.charging ? "YES" : "NO"}
            </span>
          </div>
        </div>

        <div className="text-center text-zinc-500 text-sm mt-10">
  Developed by Piyush Kaware
</div>
      </div>
    </div>
  );
}

export default App;
