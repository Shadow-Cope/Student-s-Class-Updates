// electron-builder afterPack hook: embed our icon + version metadata into the
// unpacked exe with rcedit (avoids the winCodeSign tool cache, whose archive
// contains macOS symlinks that cannot be extracted without admin rights).
const { execFileSync } = require("child_process");
const path = require("path");
const fs = require("fs");

exports.default = async function (context) {
  if (context.electronPlatformName !== "win32") return;
  const projectDir = context.packager.projectDir;
  const exeName = `${context.packager.appInfo.productFilename}.exe`;
  const exePath = path.join(context.appOutDir, exeName);
  const rcedit = path.join(projectDir, "build", "tools", "rcedit.exe");
  const icon = path.join(projectDir, "build", "icon.ico");
  if (!fs.existsSync(exePath)) throw new Error("afterPack: exe not found: " + exePath);
  if (!fs.existsSync(rcedit)) throw new Error("afterPack: rcedit not found: " + rcedit);
  const version = context.packager.appInfo.version;
  const args = [
    exePath,
    "--set-icon", icon,
    "--set-file-version", version,
    "--set-product-version", version,
    "--set-version-string", "CompanyName", "Student's Class",
    "--set-version-string", "FileDescription", "Student's Class",
    "--set-version-string", "InternalName", "students-class",
    "--set-version-string", "LegalCopyright", "Student's Class",
    "--set-version-string", "OriginalFilename", exeName,
    "--set-version-string", "ProductName", "Student's Class"
  ];
  console.log("afterPack: embedding icon + metadata into " + exeName);
  execFileSync(rcedit, args, { stdio: "inherit" });
};
