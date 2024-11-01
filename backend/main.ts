import { app, BrowserWindow, ipcMain, shell } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";

let win: BrowserWindow | null;

// DEEP LINKING
const deepLinkName = "falkor";
if (process.defaultApp) {
  if (process.argv.length <= 2) {
    app.setAsDefaultProtocolClient(deepLinkName, process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  }
} else {
  app.setAsDefaultProtocolClient(deepLinkName);
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (_event, commandLine, _workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }

    win?.webContents.send("app:deep-link", commandLine?.pop()?.slice(0));
  });

  app.whenReady().then(async () => {
    createWindow();

    await import("./handlers/events");

    while (!win) {
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    win.webContents.once("did-finish-load", () => {
      setTimeout(() => {
        win?.webContents.send("app:backend-loaded");
      }, 1000);
    });
  });
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

/**
 * Updates an existing key-value pair in an object, or inserts a new pair
 * if the key does not already exist.
 *
 * @param {Record<string, unknown>} obj
 * @param {string} keyToChange
 * @param {*} value
 * @returns {void}
 */

function createWindow() {
  // TODO: find better way of disabling cors
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
    autoHideMenuBar: true,
    minWidth: 1280,
    minHeight: 800,
    height: 800,
    width: 1280,
  });

  ipcMain.handle("request", async (_e, url: string, options?: RequestInit) => {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  });

  ipcMain.handle("openExternal", async (_e, url: string) => {
    await shell.openExternal(url);
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
