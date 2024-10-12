import { themes } from "electron/handlers/themes";
import { registerEvent } from "../utils/registerEvent";

const getThemes = async (_event: Electron.IpcMainInvokeEvent) => {
  try {
    return await themes.list();
  } catch (error) {
    console.error(error);

    return (error as Error).message;
  }
};

registerEvent("themes:all", getThemes);