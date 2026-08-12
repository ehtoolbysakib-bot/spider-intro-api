const path = require('path');
const fs = require('fs');
const os = require('os');
const { execSync } = require('child_process');

// Configure Fontconfig BEFORE loading sharp
const fontsDir = path.join(__dirname, '../assets/fonts');
const confDir = path.join(__dirname, '../assets/fontconfig');

if (!fs.existsSync(confDir)) {
  fs.mkdirSync(confDir, { recursive: true });
}

const userFontsDir = path.join(os.homedir(), '.fonts');
const userLocalFontsDir = path.join(os.homedir(), '.local', 'share', 'fonts');

[userFontsDir, userLocalFontsDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

if (fs.existsSync(fontsDir)) {
  const fontFiles = fs.readdirSync(fontsDir);
  fontFiles.forEach((file) => {
    if (file.endsWith('.ttf') || file.endsWith('.otf')) {
      const src = path.join(fontsDir, file);
      try {
        fs.copyFileSync(src, path.join(userFontsDir, file));
        fs.copyFileSync(src, path.join(userLocalFontsDir, file));
      } catch (_) {}
    }
  });
}

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
} catch (_) {}

process.env.FONTCONFIG_PATH = confDir;

try {
  execSync(`fc-cache -f "${fontsDir}" "${userFontsDir}" "${userLocalFontsDir}"`, { stdio: 'ignore' });
} catch (_) {}

const sharp = require('sharp');

async function buildTemplate() {
  const width = 1200;
  const height = 1100;

  const pirataB64 = fs.readFileSync(path.join(__dirname, '../assets/fonts/PirataOne-Regular.ttf')).toString('base64');

  // Fields configuration
  const fields = [
    { label: 'Name', y: 250, labelX: 190, arrowX: 330, lineStartX: 370, lineEndX: 1040 },
    { label: 'Age', y: 345, labelX: 190, arrowX: 280, lineStartX: 320, lineEndX: 1040 },
    { label: 'Location', y: 440, labelX: 190, arrowX: 370, lineStartX: 410, lineEndX: 1040 },
    { label: 'Religion', y: 535, labelX: 190, arrowX: 360, lineStartX: 400, lineEndX: 1040 },
    { label: 'Relationship', y: 630, labelX: 190, arrowX: 420, lineStartX: 460, lineEndX: 1040 },
    { label: 'Hight', y: 725, labelX: 190, arrowX: 310, lineStartX: 350, lineEndX: 1040 },
    { label: 'Birthday', y: 820, labelX: 190, arrowX: 360, lineStartX: 400, lineEndX: 1040 },
    { label: 'Besteii:', y: 915, labelX: 190, arrowX: 350, lineStartX: 390, lineEndX: 1040 },
  ];

  // Intricate Light-Theme Spiderweb SVGs (Crimson lines against Light Parchment Canvas)
  const topWebLeft = `
    <g stroke="#7a0000" stroke-opacity="0.32" stroke-width="1.2" fill="none">
      <path d="M 0 0 L 260 0 M 0 0 L 240 70 M 0 0 L 190 160 M 0 0 L 120 230 M 0 0 L 0 260" />
      <path d="M 60 0 Q 50 25 0 50 M 120 0 Q 95 50 0 100 M 180 0 Q 140 85 0 160 M 230 0 Q 180 130 0 220 M 260 0 Q 210 160 0 260" />
    </g>
  `;

  const topWebRight = `
    <g transform="translate(1200, 0) scale(-1, 1)" stroke="#7a0000" stroke-opacity="0.32" stroke-width="1.2" fill="none">
      <path d="M 0 0 L 260 0 M 0 0 L 240 70 M 0 0 L 190 160 M 0 0 L 120 230 M 0 0 L 0 260" />
      <path d="M 60 0 Q 50 25 0 50 M 120 0 Q 95 50 0 100 M 180 0 Q 140 85 0 160 M 230 0 Q 180 130 0 220 M 260 0 Q 210 160 0 260" />
    </g>
  `;

  const bottomWebLeft = `
    <g transform="translate(0, 1100) scale(1, -1)" stroke="#7a0000" stroke-opacity="0.3" stroke-width="1.2" fill="none">
      <path d="M 0 0 L 240 0 M 0 0 L 210 60 M 0 0 L 160 140 M 0 0 L 90 200 M 0 0 L 0 230" />
      <path d="M 50 0 Q 40 20 0 40 M 100 0 Q 80 40 0 80 M 150 0 Q 120 70 0 130 M 200 0 Q 160 110 0 180 M 240 0 Q 190 140 0 230" />
    </g>
  `;

  const bottomWebRight = `
    <g transform="translate(1200, 1100) scale(-1, -1)" stroke="#7a0000" stroke-opacity="0.3" stroke-width="1.2" fill="none">
      <path d="M 0 0 L 240 0 M 0 0 L 210 60 M 0 0 L 160 140 M 0 0 L 90 200 M 0 0 L 0 230" />
      <path d="M 50 0 Q 40 20 0 40 M 100 0 Q 80 40 0 80 M 150 0 Q 120 70 0 130 M 200 0 Q 160 110 0 180 M 240 0 Q 190 140 0 230" />
    </g>
  `;

  // Detailed Spider Generator Helper
  const drawSpider = (cx, cy, scale = 1, rotation = 0, opacity = 1) => `
    <g transform="translate(${cx}, ${cy}) scale(${scale}) rotate(${rotation})" opacity="${opacity}">
      <!-- Abdomen & Thorax -->
      <ellipse cx="0" cy="3" rx="7.5" ry="10" fill="#1f0202" stroke="#800000" stroke-width="0.8"/>
      <circle cx="0" cy="-7" r="5" fill="#1f0202" stroke="#800000" stroke-width="0.8"/>
      
      <!-- Hourglass Mark / Crimson Pattern -->
      <polygon points="-2.5,-2 2.5,-2 0,2" fill="#d60000"/>
      <polygon points="-2.5,6 2.5,6 0,2" fill="#d60000"/>
      
      <!-- Fangs / Eyes -->
      <circle cx="-2" cy="-9" r="1" fill="#ff1a1a"/>
      <circle cx="2" cy="-9" r="1" fill="#ff1a1a"/>
      
      <!-- Legs (Left) -->
      <path d="M -5 -5 Q -16 -15 -20 -8" stroke="#800000" stroke-width="1.6" fill="none"/>
      <path d="M -6 -1 Q -20 -9 -22 2" stroke="#800000" stroke-width="1.6" fill="none"/>
      <path d="M -6 3 Q -20 10 -21 16" stroke="#800000" stroke-width="1.6" fill="none"/>
      <path d="M -5 7 Q -15 18 -13 24" stroke="#800000" stroke-width="1.6" fill="none"/>
      
      <!-- Legs (Right) -->
      <path d="M 5 -5 Q 16 -15 20 -8" stroke="#800000" stroke-width="1.6" fill="none"/>
      <path d="M 6 -1 Q 20 -9 22 2" stroke="#800000" stroke-width="1.6" fill="none"/>
      <path d="M 6 3 Q 20 10 21 16" stroke="#800000" stroke-width="1.6" fill="none"/>
      <path d="M 5 7 Q 15 18 13 24" stroke="#800000" stroke-width="1.6" fill="none"/>
    </g>
  `;

  // Arrowhead Pointer
  const drawArrow = (x, y) => `
    <g transform="translate(${x}, ${y - 8})">
      <path d="M 0 0 L 16 8 L 0 16 L 5 8 Z" fill="url(#crimsonArrowGradient)"/>
      <path d="M 0 0 L 16 8 L 0 16" fill="none" stroke="#b30000" stroke-width="1"/>
    </g>
  `;

  let fieldsMarkup = '';
  fields.forEach((f, idx) => {
    // Spider icon next to every field
    fieldsMarkup += drawSpider(f.labelX - 55, f.y - 10, 0.75, (idx % 2 === 0 ? 0 : 15), 0.95);
    
    // Field Label
    fieldsMarkup += `
      <text x="${f.labelX}" y="${f.y}" font-family="Pirata One" font-size="44" font-weight="normal" fill="url(#gothicTitleRed)" filter="url(#softShadow)">${f.label}</text>
    `;
    
    // Arrowhead pointer
    fieldsMarkup += drawArrow(f.arrowX, f.y);
    
    // Red / Burgundy underline
    fieldsMarkup += `
      <line x1="${f.lineStartX}" y1="${f.y + 10}" x2="${f.lineEndX}" y2="${f.y + 10}" stroke="#800000" stroke-width="2" opacity="0.85"/>
      <line x1="${f.lineStartX}" y1="${f.y + 12}" x2="${f.lineEndX}" y2="${f.y + 12}" stroke="#b30000" stroke-width="0.7" opacity="0.6"/>
    `;
  });

  const svgTemplate = `
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        @font-face {
          font-family: 'Pirata One';
          src: url('data:font/ttf;charset=utf-8;base64,${pirataB64}') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
      </style>

      <!-- Parchment Background Gradient -->
      <radialGradient id="lightBg" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="50%" stop-color="#f8f6f0"/>
        <stop offset="85%" stop-color="#eee9df"/>
        <stop offset="100%" stop-color="#e2dad0"/>
      </radialGradient>

      <!-- Gradient for Main Titles & Labels -->
      <linearGradient id="gothicTitleRed" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#990000"/>
        <stop offset="50%" stop-color="#7a0000"/>
        <stop offset="100%" stop-color="#4d0000"/>
      </linearGradient>

      <!-- Arrow Pointer Gradient -->
      <linearGradient id="crimsonArrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#cc0000"/>
        <stop offset="100%" stop-color="#660000"/>
      </linearGradient>

      <!-- Soft Shadow Filter for Light Background -->
      <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.5" flood-color="#550000" flood-opacity="0.25"/>
      </filter>
    </defs>

    <!-- Light Theme Parchment Canvas -->
    <rect width="100%" height="100%" fill="url(#lightBg)"/>

    <!-- Decorative Corner & Border Frame -->
    <rect x="12" y="12" width="1176" height="1076" fill="none" stroke="#6b0000" stroke-width="2.5"/>
    <rect x="18" y="18" width="1164" height="1064" fill="none" stroke="#800000" stroke-width="0.8" stroke-dasharray="8 4" opacity="0.6"/>

    <!-- Corner Brackets -->
    <path d="M 12 50 L 50 12 M 1188 50 L 1150 12 M 12 1050 L 50 1088 M 1188 1050 L 1150 1088" stroke="#800000" stroke-width="2"/>

    <!-- Spiderwebs in 4 Corners -->
    ${topWebLeft}
    ${topWebRight}
    ${bottomWebLeft}
    ${bottomWebRight}

    <!-- Multiple Dangling Spiders on Silk Threads -->
    <!-- Dangling Spider 1 (Top Left) -->
    <line x1="120" y1="0" x2="120" y2="160" stroke="#7a0000" stroke-width="0.8" stroke-dasharray="3 2" opacity="0.5"/>
    ${drawSpider(120, 160, 0.95, 0, 0.9)}

    <!-- Dangling Spider 2 (Top Right) -->
    <line x1="1080" y1="0" x2="1080" y2="180" stroke="#7a0000" stroke-width="0.8" stroke-dasharray="3 2" opacity="0.5"/>
    ${drawSpider(1080, 180, 0.95, 0, 0.9)}

    <!-- Dangling Spider 3 (Right Margin Middle) -->
    <line x1="1120" y1="0" x2="1120" y2="580" stroke="#7a0000" stroke-width="0.8" opacity="0.4"/>
    ${drawSpider(1120, 580, 1.1, -10, 0.95)}

    <!-- Dangling Spider 4 (Left Margin Middle) -->
    <line x1="80" y1="0" x2="80" y2="520" stroke="#7a0000" stroke-width="0.8" opacity="0.4"/>
    ${drawSpider(80, 520, 1.05, 12, 0.9)}

    <!-- Spider 5 & 6 Flanking Title -->
    ${drawSpider(230, 105, 1.25, -15, 1)}
    ${drawSpider(970, 105, 1.25, 15, 1)}

    <!-- Top Ornaments Flanking Title -->
    <text x="350" y="115" font-size="28" fill="#800000" text-anchor="middle">✦</text>
    <text x="850" y="115" font-size="28" fill="#800000" text-anchor="middle">✦</text>

    <!-- Main Title "About Me" -->
    <text x="600" y="118" font-family="Pirata One" font-size="80" font-weight="normal" fill="url(#gothicTitleRed)" text-anchor="middle" filter="url(#softShadow)">About Me</text>

    <!-- 8 Field Rows with Spiders & Labels -->
    ${fieldsMarkup}

    <!-- Bottom Credit Section "SA K IB" -->
    <line x1="350" y1="1000" x2="850" y2="1000" stroke="#800000" stroke-width="1" opacity="0.5"/>
    <text x="330" y="1038" font-size="20" fill="#800000" text-anchor="middle">✦</text>
    <text x="870" y="1038" font-size="20" fill="#800000" text-anchor="middle">✦</text>
    
    <!-- Spiders flanking credit text -->
    ${drawSpider(380, 1035, 0.7, -20, 0.85)}
    ${drawSpider(820, 1035, 0.7, 20, 0.85)}

    <!-- Credit Text -->
    <text x="600" y="1038" font-family="Pirata One" font-size="32" font-weight="normal" fill="#660000" text-anchor="middle" letter-spacing="3px">
      Design by SA K IB
    </text>
  </svg>
  `;

  await sharp(Buffer.from(svgTemplate))
    .png()
    .toFile(path.join(__dirname, '../assets/template.png'));

  console.log('Successfully generated assets/template.png (Light Theme + Spiders + Credit)');
}

buildTemplate().catch(console.error);
