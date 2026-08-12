const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function buildTemplate() {
  const width = 1200;
  const height = 1100;

  const pirataB64 = fs.readFileSync(path.join(__dirname, '../assets/fonts/PirataOne-Regular.ttf')).toString('base64');

  // Fields configuration
  const fields = [
    { label: 'Name', y: 260, labelX: 200, arrowX: 340, lineStartX: 380, lineEndX: 1020 },
    { label: 'Age', y: 360, labelX: 200, arrowX: 290, lineStartX: 330, lineEndX: 1020 },
    { label: 'Location', y: 460, labelX: 200, arrowX: 380, lineStartX: 420, lineEndX: 1020 },
    { label: 'Religion', y: 560, labelX: 200, arrowX: 370, lineStartX: 410, lineEndX: 1020 },
    { label: 'Relationship', y: 660, labelX: 200, arrowX: 430, lineStartX: 470, lineEndX: 1020 },
    { label: 'Hight', y: 760, labelX: 200, arrowX: 320, lineStartX: 360, lineEndX: 1020 },
    { label: 'Birthday', y: 860, labelX: 200, arrowX: 370, lineStartX: 410, lineEndX: 1020 },
    { label: 'Besteii:', y: 960, labelX: 200, arrowX: 360, lineStartX: 400, lineEndX: 1020 },
  ];

  // Generate spiderweb SVG paths
  const topWebLeft = `
    <g stroke="#ffffff" stroke-opacity="0.35" stroke-width="1.5" fill="none">
      <path d="M 0 0 L 220 0 M 0 0 L 200 60 M 0 0 L 160 140 M 0 0 L 100 200 M 0 0 L 0 220" />
      <path d="M 50 0 Q 40 20 0 40 M 100 0 Q 80 40 0 80 M 150 0 Q 120 70 0 130 M 200 0 Q 160 110 0 180 M 220 0 Q 180 140 0 220" />
    </g>
  `;

  const topWebRight = `
    <g transform="translate(1200, 0) scale(-1, 1)" stroke="#ffffff" stroke-opacity="0.35" stroke-width="1.5" fill="none">
      <path d="M 0 0 L 220 0 M 0 0 L 200 60 M 0 0 L 160 140 M 0 0 L 100 200 M 0 0 L 0 220" />
      <path d="M 50 0 Q 40 20 0 40 M 100 0 Q 80 40 0 80 M 150 0 Q 120 70 0 130 M 200 0 Q 160 110 0 180 M 220 0 Q 180 140 0 220" />
    </g>
  `;

  const bottomWebLeft = `
    <g transform="translate(0, 1100) scale(1, -1)" stroke="#ffffff" stroke-opacity="0.3" stroke-width="1.5" fill="none">
      <path d="M 0 0 L 200 0 M 0 0 L 180 50 M 0 0 L 140 120 M 0 0 L 80 170 M 0 0 L 0 190" />
      <path d="M 40 0 Q 30 15 0 30 M 80 0 Q 60 30 0 60 M 120 0 Q 90 55 0 100 M 160 0 Q 130 85 0 145 M 200 0 Q 150 115 0 190" />
    </g>
  `;

  const bottomWebRight = `
    <g transform="translate(1200, 1100) scale(-1, -1)" stroke="#ffffff" stroke-opacity="0.3" stroke-width="1.5" fill="none">
      <path d="M 0 0 L 200 0 M 0 0 L 180 50 M 0 0 L 140 120 M 0 0 L 80 170 M 0 0 L 0 190" />
      <path d="M 40 0 Q 30 15 0 30 M 80 0 Q 60 30 0 60 M 120 0 Q 90 55 0 100 M 160 0 Q 130 85 0 145 M 200 0 Q 150 115 0 190" />
    </g>
  `;

  // Spider icon helper
  const drawSpider = (cx, cy, scale = 1) => `
    <g transform="translate(${cx}, ${cy}) scale(${scale})">
      <!-- Body & Head -->
      <ellipse cx="0" cy="2" rx="7" ry="9" fill="#111111" stroke="#ff3333" stroke-width="0.8"/>
      <circle cx="0" cy="-8" r="4.5" fill="#111111" stroke="#ff3333" stroke-width="0.8"/>
      <!-- Eyes / Hourglass motif -->
      <polygon points="-2,-1 2,-1 0,3" fill="#ff1a1a"/>
      <polygon points="-2,5 2,5 0,1" fill="#ff1a1a"/>
      <!-- Glowing eyes -->
      <circle cx="-1.8" cy="-9" r="1" fill="#ff3333"/>
      <circle cx="1.8" cy="-9" r="1" fill="#ff3333"/>
      <!-- Legs (Left) -->
      <path d="M -5 -6 Q -15 -14 -18 -8" stroke="#ff2222" stroke-width="1.5" fill="none"/>
      <path d="M -6 -2 Q -18 -8 -20 2" stroke="#ff2222" stroke-width="1.5" fill="none"/>
      <path d="M -6 2 Q -18 8 -19 14" stroke="#ff2222" stroke-width="1.5" fill="none"/>
      <path d="M -5 6 Q -14 16 -12 22" stroke="#ff2222" stroke-width="1.5" fill="none"/>
      <!-- Legs (Right) -->
      <path d="M 5 -6 Q 15 -14 18 -8" stroke="#ff2222" stroke-width="1.5" fill="none"/>
      <path d="M 6 -2 Q 18 -8 20 2" stroke="#ff2222" stroke-width="1.5" fill="none"/>
      <path d="M 6 2 Q 18 8 19 14" stroke="#ff2222" stroke-width="1.5" fill="none"/>
      <path d="M 5 6 Q 14 16 12 22" stroke="#ff2222" stroke-width="1.5" fill="none"/>
    </g>
  `;

  // Red arrowhead pointer helper
  const drawArrow = (x, y) => `
    <g transform="translate(${x}, ${y - 8})">
      <path d="M 0 0 L 16 8 L 0 16 L 5 8 Z" fill="url(#redGlowGradient)"/>
      <path d="M 0 0 L 16 8 L 0 16" fill="none" stroke="#ff6666" stroke-width="0.8"/>
    </g>
  `;

  let fieldsMarkup = '';
  fields.forEach(f => {
    // Spider on left
    fieldsMarkup += drawSpider(f.labelX - 60, f.y - 10, 0.75);
    // Label
    fieldsMarkup += `
      <text x="${f.labelX}" y="${f.y}" font-family="Pirata One" font-size="44" font-weight="normal" fill="url(#gothicRed)" filter="url(#dropShadow)">${f.label}</text>
    `;
    // Arrowhead
    fieldsMarkup += drawArrow(f.arrowX, f.y);
    // Red horizontal line
    fieldsMarkup += `
      <line x1="${f.lineStartX}" y1="${f.y + 12}" x2="${f.lineEndX}" y2="${f.y + 12}" stroke="#cc1111" stroke-width="1.8" opacity="0.85"/>
      <line x1="${f.lineStartX}" y1="${f.y + 13}" x2="${f.lineEndX}" y2="${f.y + 13}" stroke="#ff3333" stroke-width="0.6" opacity="0.6"/>
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

      <!-- Gradient for Gothic Red Title and Labels -->
      <linearGradient id="gothicRed" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ff4d4d"/>
        <stop offset="35%" stop-color="#e60000"/>
        <stop offset="70%" stop-color="#b30000"/>
        <stop offset="100%" stop-color="#660000"/>
      </linearGradient>

      <!-- Red Glow for Arrows & Details -->
      <linearGradient id="redGlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ff3333"/>
        <stop offset="100%" stop-color="#880000"/>
      </linearGradient>

      <!-- Subtle Shadow Filter for Gothic Text -->
      <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="2" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.9"/>
      </filter>
      <filter id="redGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComponentTransfer in="blur">
          <feFuncA type="linear" slope="0.7"/>
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <!-- Pitch Black Background -->
    <rect width="100%" height="100%" fill="#050505"/>

    <!-- Subtle border frame -->
    <rect x="10" y="10" width="1180" height="1080" fill="none" stroke="#220000" stroke-width="2"/>
    <rect x="15" y="15" width="1170" height="1070" fill="none" stroke="#aa1111" stroke-width="0.8" opacity="0.3"/>

    <!-- Spiderwebs in 4 corners -->
    ${topWebLeft}
    ${topWebRight}
    ${bottomWebLeft}
    ${bottomWebRight}

    <!-- Dangling Spider on Right Edge -->
    <line x1="1110" y1="0" x2="1110" y2="620" stroke="#ffffff" stroke-width="0.8" opacity="0.4"/>
    ${drawSpider(1110, 620, 1.1)}

    <!-- Top Spiders flanking title -->
    ${drawSpider(240, 110, 1.2)}
    ${drawSpider(960, 110, 1.2)}

    <!-- Red Sparkles flanking title -->
    <text x="360" y="122" font-size="32" fill="#ff3333" filter="url(#redGlow)" text-anchor="middle">✦</text>
    <text x="840" y="122" font-size="32" fill="#ff3333" filter="url(#redGlow)" text-anchor="middle">✦</text>

    <!-- Main Title "About Me" -->
    <text x="600" y="125" font-family="Pirata One" font-size="82" font-weight="normal" fill="url(#gothicRed)" text-anchor="middle" filter="url(#dropShadow)">About Me</text>

    <!-- 8 Field Rows -->
    ${fieldsMarkup}
  </svg>
  `;

  await sharp(Buffer.from(svgTemplate))
    .png()
    .toFile(path.join(__dirname, '../assets/template.png'));

  console.log('Successfully generated assets/template.png');
}

buildTemplate().catch(console.error);
