import { app } from "electron";
import path from "path";
export const getAssetPath = (...segments) => path.join(app.getAppPath(), "assets", ...segments);
