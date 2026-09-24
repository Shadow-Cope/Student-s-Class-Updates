// Pack rendered PNGs into a multi-size Windows icon.
const pngToIco = require("png-to-ico").default || require("png-to-ico");
const fs = require("fs");
const path = require("path");

(async () => {
  const files = [256, 128, 64, 48, 32, 16].map(s => path.join(__dirname, `icon-${s}.png`));
  for (const f of files) {
    if (!fs.existsSync(f)) { console.error("missing " + f + " — run render-icon first"); process.exit(1); }
  }
  const buf = await pngToIco(files);
  fs.writeFileSync(path.join(__dirname, "icon.ico"), buf);
  console.log("wrote icon.ico (" + buf.length + " bytes)");
})().catch(err => { console.error(err); process.exit(1); });
