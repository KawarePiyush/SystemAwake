import { app } from "electron";
class StartupService {
    enable() {
        app.setLoginItemSettings({
            openAtLogin: true,
            openAsHidden: true,
        });
        console.log("Startup enabled");
    }
    disable() {
        app.setLoginItemSettings({
            openAtLogin: false,
        });
        console.log("Startup disabled");
    }
    isEnabled() {
        return app.getLoginItemSettings()
            .openAtLogin;
    }
}
export default new StartupService();
