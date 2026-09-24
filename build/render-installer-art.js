/* Render branded NSIS installer art at exact sizes and write 24-bit BMPs directly
   (pure JS encoder — no external tools needed).
   Produces: build/installer-header.bmp (150x57), build/installer-sidebar.bmp (164x314)
   Run: npx electron build/render-installer-art.js */
const { app, BrowserWindow } = require("electron");
const fs = require("fs");
const path = require("path");

function writeBmp24(filePath, bitmap, w, h) {
  // bitmap: BGRA top-down buffer from NativeImage.toBitmap()
  const rowSize = Math.floor((24 * w + 31) / 32) * 4;
  const imgSize = rowSize * h;
  const buf = Buffer.alloc(54 + imgSize);
  buf.write("BM", 0);
  buf.writeUInt32LE(54 + imgSize, 2);
  buf.writeUInt32LE(54, 10);
  buf.writeUInt32LE(40, 14);
  buf.writeInt32LE(w, 18);
  buf.writeInt32LE(h, 22); // positive => bottom-up
  buf.writeUInt16LE(1, 26);
  buf.writeUInt16LE(24, 28);
  buf.writeUInt32LE(0, 30);
  buf.writeUInt32LE(imgSize, 34);
  buf.writeInt32LE(2835, 38);
  buf.writeInt32LE(2835, 42);
  let o = 54;
  for (let y = h - 1; y >= 0; y--) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      buf[o++] = bitmap[i];     // B
      buf[o++] = bitmap[i + 1]; // G
      buf[o++] = bitmap[i + 2]; // R
    }
    while ((o - 54) % rowSize !== 0) buf[o++] = 0;
  }
  fs.writeFileSync(filePath, buf);
  console.log("wrote " + path.basename(filePath) + " (" + buf.length + " bytes)");
}

async function capture(win, name, htmlFile, w, h) {
  win.setSize(w, h);
  await win.loadFile(htmlFile);
  await new Promise(r => setTimeout(r, 900));
  const img = await win.webContents.capturePage();
  const size = img.getSize();
  if (!size.width || !size.height) throw new Error("empty capture for " + name);
  // NSIS needs the exact pixel size: crop/scale via resize to be sure
  const shot = (size.width === w && size.height === h) ? img : img.resize({ width: w, height: h });
  const dims = shot.getSize();
  writeBmp24(path.join(__dirname, name + ".bmp"), shot.toBitmap(), dims.width, dims.height);
  fs.writeFileSync(path.join(__dirname, name + ".png"), shot.toPNG());
}

async function main() {
  await app.whenReady();
  const svg = fs.readFileSync(path.join(__dirname, "..", "logo.svg"), "utf8");
  const headHtml = `<html><body style="margin:0;background:#ffffff"><div style="display:flex;align-items:center;gap:10px;width:150px;height:57px;padding:0 10px;box-sizing:border-box"><div style="width:38px;height:38px;flex-shrink:0">${svg}</div><div style="font-family:Arial,sans-serif;font-size:15px;font-weight:bold;color:#1b2430;line-height:1.1">Student's<br>Class</div></div></body></html>`;
  const sideHtml = `<html><body style="margin:0;background:#1a73e8"><div style="width:164px;height:314px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;box-sizing:border-box;padding:16px"><div style="width:96px;height:96px;background:#ffffff;border-radius:22px;display:flex;align-items:center;justify-content:center"><div style="width:76px;height:76px">${svg}</div></div><div style="font-family:Arial,sans-serif;font-size:17px;font-weight:bold;color:#ffffff;text-align:center;line-height:1.25">Student's<br>Class</div></div></body></html>`;
  fs.writeFileSync(path.join(__dirname, "art-header.html"), headHtml);
  fs.writeFileSync(path.join(__dirname, "art-sidebar.html"), sideHtml);
  const win = new BrowserWindow({ show: false, width: 150, height: 57, webPreferences: { offscreen: true } });
  await capture(win, "installer-header", path.join(__dirname, "art-header.html"), 150, 57);
  await capture(win, "installer-sidebar", path.join(__dirname, "art-sidebar.html"), 164, 314);
  app.quit();
}

main().catch(err => { console.error(err); app.exit(1); });
