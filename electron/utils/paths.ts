import { app } from "electron";
import path from "path";

export const getAssetPath = (...segments: string[]) =>
  path.join(app.getAppPath(), "assets", ...segments);
