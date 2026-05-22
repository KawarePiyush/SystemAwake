import Store from "electron-store";
class SettingsService {
    constructor() {
        this.store = new Store({
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
    set(key, value) {
        this.store.set(key, value);
    }
    get(key) {
        return this.store.get(key);
    }
}
export default new SettingsService();
