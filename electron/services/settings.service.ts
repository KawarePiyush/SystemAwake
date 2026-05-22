import Store from "electron-store";

type SettingsSchema = {
  movementIntervalMin: number;
  movementIntervalMax: number;
  autoStart: boolean;
  keyboardSimulation: boolean;
  minimizeToTray: boolean;
  launchOnStartup:boolean;
};

class SettingsService {
  private store: Store<SettingsSchema>;

  constructor() {
    this.store = new Store<SettingsSchema>({
      defaults: {
        movementIntervalMin: 10,
        movementIntervalMax: 10,
        autoStart: true,
        keyboardSimulation: false,
        minimizeToTray: true,
        launchOnStartup: true,
      },
    });
  }

  getAll() {
    return this.store.store;
  }

  set<K extends keyof SettingsSchema>(
    key: K,
    value: SettingsSchema[K]
  ) {
    this.store.set(key, value);
  }

  get<K extends keyof SettingsSchema>(
    key: K
  ) {
    return this.store.get(key);
  }
}

export default new SettingsService();