import type { Settings } from "./settings";
export {};

declare global {
  interface Window {
    electronAPI: {
      startActivity: () => Promise<void>;
      stopActivity: () => Promise<void>;
      getSettings: () => Promise<Settings>;

      setSetting: (key: string, value: unknown) => Promise<void>;

      showNotification: (title: string, body: string) => Promise<void>;
    };
  }
}
