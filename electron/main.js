const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const path = require("path");

app.setAppUserModelId("com.studentsclass.app");

let splash;
let mainWindow;
let mainShown = false;
let updateCheckDone = false;
let updatePending = false; // a required update is downloading/downloaded: main stays hidden
let mainReady = false;

const APP_ICON = path.join(__dirname, "..", "build", "icon.ico");

/* ---------- splash status (progress bar + text) ---------- */
function splashMsg(text, frac) {
  if (!splash || splash.isDestroyed()) return;
  const t = JSON.stringify(String(text));
  const f = frac == null ? "null" : Number(frac);
  splash.webContents.executeJavaScript(`window.updateSplash && window.updateSplash(${t}, ${f})`).catch(() => {});
}

/* ---------- show main window (once) ---------- */
function showMainOnce() {
  if (mainShown || updatePending) return;
  if (!mainWindow || mainWindow.isDestroyed()) return;
  mainShown = true;
  const started = Number(mainWindow.__scStarted || Date.now());
  const MIN_SPLASH_MS = 1800; // keep splash visible long enough to actually read
  const wait = Math.max(0, MIN_SPLASH_MS - (Date.now() - started));
  const show = () => {
    if (!mainWindow || mainWindow.isDestroyed()) return;
    if (splash && !splash.isDestroyed()) splash.close();
    if (!mainShown) return;
    mainWindow.show();
    mainWindow.focus();
  };
  if (mainReady) setTimeout(show, wait);
  else mainWindow.once("ready-to-show", () => setTimeout(show, Math.max(0, MIN_SPLASH_MS - (Date.now() - started))));
}

function proceedAfterCheck() {
  updateCheckDone = true;
  showMainOnce();
}

/* ---------- mandatory auto-updates (electron-updater, GitHub releases) ---------- */
let updaterWired = false;
function wireUpdater() {
  if (updaterWired) return;
  updaterWired = true;
  let autoUpdater;
  try {
    autoUpdater = require("electron-updater").autoUpdater;
  } catch (e) { proceedAfterCheck(); return; }
  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = false;

  autoUpdater.on("update-available", (info) => {
    updatePending = true;
    splashMsg(`Required update ${info.version} found — downloading…`, 0);
  });
  autoUpdater.on("download-progress", (p) => {
    splashMsg(`Downloading required update… ${Math.round(p.percent)}%`, (p.percent || 0) / 100);
  });
  autoUpdater.on("update-downloaded", () => {
    if (mainShown) return; // mid-session: the restart-nag handler below takes over
    splashMsg("Update ready — restarting to install…", 1);
    setTimeout(() => { try { autoUpdater.quitAndInstall(); } catch (e) { app.exit(0); } }, 1200);
  });
  const failOpen = (wasDownloading) => {
    // Offline or broken feed: never brick the app — ask once, then open.
    updatePending = false;
    if (wasDownloading && mainWindow && !mainWindow.isDestroyed()) {
      dialog.showMessageBox(mainWindow, {
        type: "warning",
        title: "Student's Class — update failed",
        message: "The required update could not be downloaded. Check your connection.",
        buttons: ["Retry", "Continue without updating"],
        defaultId: 0
      }).then(({ response }) => {
        if (response === 0) { updatePending = false; updateCheckDone = false; checkForUpdates(); }
        else proceedAfterCheck();
      }).catch(() => proceedAfterCheck());
    } else {
      proceedAfterCheck();
    }
  };
  autoUpdater.on("error", () => failOpen(updatePending));
  autoUpdater.on("update-not-available", () => { updatePending = false; proceedAfterCheck(); });

  // Manual / periodic checks from the Settings screen or the timer below.
  ipcMain.handle("sc-check-updates", async () => {
    if (!app.isPackaged) return { status: "dev" };
    try {
      const r = await autoUpdater.checkForUpdates();
      if (r && r.updateInfo && r.updateInfo.version !== app.getVersion()) return { status: "available", version: r.updateInfo.version };
      return { status: "checking" };
    } catch (e) { return { status: "error", message: String((e && e.message) || e) }; }
  });
  ipcMain.handle("sc-app-version", () => app.getVersion());
  // Mid-session mandatory prompt: downloaded while using the app.
  let nagged = false;
  const origDownloaded = autoUpdater.listeners("update-downloaded").slice();
  autoUpdater.removeAllListeners("update-downloaded");
  origDownloaded.forEach(fn => autoUpdater.on("update-downloaded", fn));
  autoUpdater.on("update-downloaded", () => {
    if (mainShown && !nagged) {
      nagged = true;
      dialog.showMessageBox(mainWindow, {
        type: "info",
        title: "Student's Class — restart required",
        message: "A required update was downloaded. Restart now to keep using the app.",
        buttons: ["Restart now"],
        defaultId: 0
      }).then(() => { try { autoUpdater.quitAndInstall(); } catch (e) { app.exit(0); } });
    }
  });

  // Mid-session: an update found while the app is open still downloads automatically.
  const notifyRenderer = (status, extra) => {
    if (mainShown && mainWindow && !mainWindow.isDestroyed()) {
      try { mainWindow.webContents.send("sc-update-result", { status, ...(extra || {}) }); } catch (e) {}
    }
  };
  autoUpdater.on("update-available", (info) => notifyRenderer("downloading", { version: info && info.version }));
  autoUpdater.on("update-not-available", () => notifyRenderer("uptodate"));
  autoUpdater.on("error", (e) => notifyRenderer("error", { message: String((e && e.message) || e) }));

  checkForUpdates();
  // Re-check every 6 hours while running.
  setInterval(() => { if (app.isPackaged) { try { autoUpdater.checkForUpdates(); } catch (e) {} } }, 6 * 3600 * 1000);
}

function checkForUpdates() {
  if (!app.isPackaged) { proceedAfterCheck(); return; } // dev mode: no feed
  splashMsg("Checking for updates…", null);
  let autoUpdater;
  try {
    autoUpdater = require("electron-updater").autoUpdater;
  } catch (e) { proceedAfterCheck(); return; }
  // Safety: never trap the user on the splash (offline etc.) — capped by the error path,
  // plus a hard timeout here.
  const fallback = setTimeout(() => { if (!updateCheckDone && !updatePending) proceedAfterCheck(); }, 25000);
  autoUpdater.once("update-not-available", () => clearTimeout(fallback));
  autoUpdater.once("update-available", () => clearTimeout(fallback));
  autoUpdater.once("error", () => clearTimeout(fallback));
  try {
    autoUpdater.checkForUpdates().catch(() => {});
  } catch (e) { clearTimeout(fallback); proceedAfterCheck(); }
}

function createWindows() {
  // Splash / loading screen (small, centered, no frame)
  splash = new BrowserWindow({
    width: 360,
    height: 440,
    frame: false,
    resizable: false,
    center: true,
    show: true,
    backgroundColor: "#ffffff",
    icon: APP_ICON
  });
  splash.loadFile(path.join(__dirname, "splash.html"));

  // Main window reuses the exact same web UI (index.html + app.js + styles.css)
  mainWindow = new BrowserWindow({
    width: 1120,
    height: 760,
    minWidth: 900,
    minHeight: 600,
    center: true,
    show: false, // shown only after the update check passes (updates are mandatory)
    autoHideMenuBar: true,
    title: "Student's Class",
    icon: APP_ICON,
    backgroundColor: "#f0f2f5",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.cjs")
    }
  });
  mainWindow.__scStarted = Date.now();
  mainWindow.loadFile(path.join(__dirname, "..", "index.html"));
  mainWindow.once("ready-to-show", () => { mainReady = true; if (updateCheckDone) showMainOnce(); });

  // Fallback: never trap the user on the splash if something is slow
  setTimeout(() => {
    if (!mainShown && !updatePending && mainWindow && !mainWindow.isVisible()) {
      updateCheckDone = true;
      showMainOnce();
    }
  }, 30000);

  mainWindow.on("closed", () => { mainWindow = null; });

  wireUpdater();
}

app.whenReady().then(createWindows);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) { mainShown = false; updateCheckDone = false; createWindows(); }
});
