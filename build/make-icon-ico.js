/* Build a classic 32-bit BMP-based .ico (max Windows compatibility) from logo.svg.
   Captures each size with Electron, encodes ICO with proper AND transparency masks.
   Run: npx electron build/make-icon-ico.js
   Produces: build/icon.ico (16/32/48/64/128/256) */
const { app, BrowserWindow } = require("electron");
const fs = require("fs");
const path = require("path");

const SIZES = [256, 128, 64, 48, 32, 16];

function encodeIco(images) {
  // images: [{w, h, bgra:Buffer top-down}] — all w===h
  const n = images.length;
  const headerSize = 6 + 16 * n;
  const blobs = images.map(({ w, h, bgra }) => {
    const infoSize = 40;
    const xorSize = w * h * 4;
    const andRow = Math.floor((w + 31) / 32) * 4;
    const andSize = andRow * h;
    const buf = Buffer.alloc(infoSize + xorSize + andSize);
    buf.writeUInt32LE(40, 0);
    buf.writeInt32LE(w, 4);
    buf.writeInt32LE(h * 2, 8); // XOR + AND heights
    buf.writeUInt16LE(1, 12);
    buf.writeUInt16LE(32, 14);
    buf.writeUInt32LE(0, 16);
    buf.writeUInt32LE(xorSize + andSize, 20);
    let o = infoSize;
    for (let y = h - 1; y >= 0; y--) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        buf[o++] = bgra[i]; buf[o++] = bgra[i + 1]; buf[o++] = bgra[i + 2]; buf[o++] = bgra[i + 3];
      }
    }
    for (let y = h - 1; y >= 0; y--) {
      let bit = 0, cur = 0;
      const rowStart = o;
      for (let x = 0; x < w; x++) {
        const alpha = bgra[(y * w + x) * 4 + 3];
        cur = (cur << 1) | (alpha < 128 ? 1 : 0);
        bit++;
        if (bit === 8) { buf[o++] = cur; bit = 0; cur = 0; }
      }
      if (bit > 0) { buf[o++] = cur << (8 - bit); }
      while (o - rowStart < andRow) buf[o++] = 0;
    }
    return buf;
  });
  const total = headerSize + blobs.reduce((s, b) => s + b.length, 0);
  const out = Buffer.alloc(total);
  out.writeUInt16LE(0, 0);
  out.writeUInt16LE(1, 2);
  out.writeUInt16LE(n, 4);
  let off = headerSize;
  blobs.forEach((b, i) => {
    const { w, h } = images[i];
    const e = 6 + 16 * i;
    out[e] = w >= 256 ? 0 : w;
    out[e + 1] = h >= 256 ? 0 : h;
    out[e + 2] = 0; out[e + 3] = 0;
    out.writeUInt16LE(1, e + 4);
    out.writeUInt16LE(32, e + 6);
    out.writeUInt32LE(b.length, e + 8);
    out.writeUInt32LE(off, e + 12);
    b.copy(out, off);
    off += b.length;
  });
  return out;
}

async function main() {
  await app.whenReady();
  const svg = fs.readFileSync(path.join(__dirname, "..", "logo.svg"), "utf8");
  fs.writeFileSync(
    path.join(__dirname, "art-icon.html"),
    `<html><body style="margin:0;background:transparent"><div id="box" style="width:100vw;height:100vh">${svg}</div></body></html>`
  );
  const win = new BrowserWindow({ show: false, width: 256, height: 256, transparent: true, webPreferences: { offscreen: true } });
  const images = [];
  for (const s of SIZES) {
    win.setSize(s, s);
    await win.loadFile(path.join(__dirname, "art-icon.html"));
    await new Promise(r => setTimeout(r, 700));
    const img = await win.webContents.capturePage();
    const shot = (img.getSize().width === s) ? img : img.resize({ width: s, height: s });
    const dims = shot.getSize();
    if (dims.width !== s || dims.height !== s) throw new Error("bad capture size " + s);
    images.push({ w: s, h: s, bgra: shot.toBitmap() });
    console.log("captured " + s + "x" + s);
  }
  const ico = encodeIco(images);
  fs.writeFileSync(path.join(__dirname, "icon.ico"), ico);
  console.log("wrote icon.ico (" + ico.length + " bytes, classic 32-bit)");
  app.quit();
}

main().catch(err => { console.error(err); app.exit(1); });
