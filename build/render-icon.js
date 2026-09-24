/* Render logo.svg to PNGs at several sizes using Electron offscreen rendering,
   then pack them into build/icon.ico with png-to-ico.
   Run: npx electron build/render-icon.js && node build/pack-icon.cjs */
const { app, BrowserWindow } = require("electron");
const fs = require("fs");
const path = require("path");

const SIZES = [256, 128, 64, 48, 32, 16];

async function main() {
  await app.whenReady();
  const svg = fs.readFileSync(path.join(__dirname, "..", "logo.svg"), "utf8");
  const html = "data:text/html;charset=utf-8," + encodeURIComponent(
    `<html><body style="margin:0;background:transparent"><div style="width:${SIZES[0]}px;height:${SIZES[0]}px">${svg.replace(/width|height="[^"]*"/g, "")}</div></body></html>`
  );
  // NOTE: we capture per-size below by resizing; start at max size
  const win = new BrowserWindow({ show: false, width: SIZES[0], height: SIZES[0], webPreferences: { offscreen: true } });
  await win.loadURL(html);
  // give the renderer a moment to paint the SVG
  await new Promise(r => setTimeout(r, 800));
  for (const s of SIZES) {
    win.setSize(s, s);
    await new Promise(r => setTimeout(r, 250));
    const img = await win.webContents.capturePage();
    const png = s === SIZES[0] ? img.toPNG() : img.resize({ width: s, height: s }).toPNG();
    fs.writeFileSync(path.join(__dirname, `icon-${s}.png`), png);
    console.log("wrote icon-" + s + ".png");
  }
  app.quit();
}

main().catch(err => { console.error(err); app.exit(1); });
