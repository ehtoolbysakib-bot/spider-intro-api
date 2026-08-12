import path from 'path';
import fs from 'fs';
import os from 'os';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const fontsDir = path.join(rootDir, 'assets', 'fonts');
const confDir = path.join(rootDir, 'assets', 'fontconfig');

// Ensure fontconfig folder exists
if (!fs.existsSync(confDir)) {
  fs.mkdirSync(confDir, { recursive: true });
}

// User font directories in Linux
const userFontsDir = path.join(os.homedir(), '.fonts');
const userLocalFontsDir = path.join(os.homedir(), '.local', 'share', 'fonts');

[userFontsDir, userLocalFontsDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Copy font files to user font directories
if (fs.existsSync(fontsDir)) {
  const fontFiles = fs.readdirSync(fontsDir);
  fontFiles.forEach((file) => {
    if (file.endsWith('.ttf') || file.endsWith('.otf')) {
      const src = path.join(fontsDir, file);
      try {
        fs.copyFileSync(src, path.join(userFontsDir, file));
        fs.copyFileSync(src, path.join(userLocalFontsDir, file));
      } catch (e) {
        console.warn('Could not copy font file:', e.message);
      }
    }
  });
}

// Generate fonts.conf for Fontconfig to explicitly include assets/fonts and user font dirs
const fontsConfPath = path.join(confDir, 'fonts.conf');
const fontsConfContent = `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>${fontsDir}</dir>
  <dir>${userFontsDir}</dir>
  <dir>${userLocalFontsDir}</dir>
  <dir prefix="xdg">fonts</dir>
  <cachedir>/tmp/fontconfig-cache</cachedir>
  <config>
    <rescan>
      <int>30</int>
    </rescan>
  </config>
</fontconfig>`;

try {
  fs.writeFileSync(fontsConfPath, fontsConfContent);
} catch (e) {
  console.warn('Could not write fonts.conf:', e.message);
}

// CRITICAL: Set FONTCONFIG_PATH before Sharp/libvips is loaded!
process.env.FONTCONFIG_PATH = confDir;

try {
  execSync(`fc-cache -f "${fontsDir}" "${userFontsDir}" "${userLocalFontsDir}"`, { stdio: 'ignore' });
} catch (_) {}

console.log('Fontconfig initialized with FONTCONFIG_PATH:', process.env.FONTCONFIG_PATH);
