import './setupFonts.js';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import config from './config.js';
import { normalizeText, fitText } from './textUtils.js';

let fontBase64Cache = null;

/**
 * Loads all font files as base64 strings for SVG @font-face embedding.
 * @returns {string}
 */
function getFontCss() {
  if (fontBase64Cache) return fontBase64Cache;

  let pirataB64 = '';
  let unifrakturB64 = '';
  let cinzelB64 = '';
  let creepsterB64 = '';

  try {
    const rootDir = process.cwd();
    const pirataPath = path.join(rootDir, 'assets', 'fonts', 'PirataOne-Regular.ttf');
    const unifrakturPath = path.join(rootDir, 'assets', 'fonts', 'UnifrakturCook-Bold.ttf');
    const cinzelPath = path.join(rootDir, 'assets', 'fonts', 'Cinzel-Regular.ttf');
    const creepsterPath = path.join(rootDir, 'assets', 'fonts', 'Creepster-Regular.ttf');

    if (fs.existsSync(pirataPath)) pirataB64 = fs.readFileSync(pirataPath).toString('base64');
    if (fs.existsSync(unifrakturPath)) unifrakturB64 = fs.readFileSync(unifrakturPath).toString('base64');
    if (fs.existsSync(cinzelPath)) cinzelB64 = fs.readFileSync(cinzelPath).toString('base64');
    if (fs.existsSync(creepsterPath)) creepsterB64 = fs.readFileSync(creepsterPath).toString('base64');
  } catch (err) {
    console.warn('Could not read font files for base64 cache:', err.message);
  }

  fontBase64Cache = `
    @font-face {
      font-family: 'Pirata One';
      src: url('data:font/ttf;charset=utf-8;base64,${pirataB64}') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    @font-face {
      font-family: 'UnifrakturCook';
      src: url('data:font/ttf;charset=utf-8;base64,${unifrakturB64}') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    @font-face {
      font-family: 'Cinzel';
      src: url('data:font/ttf;charset=utf-8;base64,${cinzelB64}') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    @font-face {
      font-family: 'Creepster';
      src: url('data:font/ttf;charset=utf-8;base64,${creepsterB64}') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
  `;

  return fontBase64Cache;
}

/**
 * Resolves font family name based on user requested font_style parameter.
 * @param {string} fontStyle
 * @returns {string}
 */
function resolveFontFamily(fontStyle = '') {
  const style = String(fontStyle).toLowerCase().trim();
  if (style === 'unifraktur' || style === 'oldenglish' || style === 'gothic') {
    return 'UnifrakturCook';
  }
  if (style === 'cinzel' || style === 'serif' || style === 'regal') {
    return 'Cinzel';
  }
  if (style === 'creepster' || style === 'spooky' || style === 'horror') {
    return 'Creepster';
  }
  // Default font: Pirata One (Pirate Gothic)
  return 'Pirata One';
}

/**
 * Generates the About Me image with user values overlaid onto the Gothic template image.
 * @param {Object} data Query parameters (name, age, location, religion, relationship, height, birthday, bestie, font_style)
 * @returns {Promise<Buffer>} PNG Image Buffer
 */
export async function generateAboutMeImage(data = {}) {
  // Normalize and enforce maximum character limits per field
  const values = {
    name: normalizeText(data.name, config.fieldLimits.name),
    age: normalizeText(data.age, config.fieldLimits.age),
    location: normalizeText(data.location, config.fieldLimits.location),
    religion: normalizeText(data.religion, config.fieldLimits.religion),
    relationship: normalizeText(data.relationship, config.fieldLimits.relationship),
    height: normalizeText(data.height || data.hight, config.fieldLimits.height),
    birthday: normalizeText(data.birthday, config.fieldLimits.birthday),
    bestie: normalizeText(data.bestie, config.fieldLimits.bestie),
  };

  const fontFamilyName = resolveFontFamily(data.font_style);
  const fontCss = getFontCss();
  const fields = ['name', 'age', 'location', 'religion', 'relationship', 'height', 'birthday', 'bestie'];

  let textElementsSvg = '';

  fields.forEach((fieldKey) => {
    const rawVal = values[fieldKey];
    if (!rawVal) return; // Leave field blank if parameter is not provided

    const pos = config.positions[fieldKey];
    if (!pos) return;

    const { escapedText, fontSize } = fitText(
      rawVal,
      config.typography.defaultFontSize,
      config.typography.minFontSize,
      pos.maxWidth
    );

    textElementsSvg += `
      <!-- Subtle Soft Red Halo Behind Value Text -->
      <text
        x="${pos.x}"
        y="${pos.y}"
        fill="#800000"
        font-family="${fontFamilyName}"
        font-size="${fontSize}"
        letter-spacing="0.5px"
        opacity="0.15"
        stroke="#990000"
        stroke-width="1.5"
      >${escapedText}</text>
      <!-- Crisp Foreground Value Text -->
      <text
        x="${pos.x}"
        y="${pos.y}"
        fill="${config.typography.valueColor}"
        font-family="${fontFamilyName}"
        font-size="${fontSize}"
        letter-spacing="0.5px"
        filter="url(#textShadow)"
      >${escapedText}</text>
    `;
  });

  // Construct complete SVG overlay
  const svgOverlay = `
    <svg width="${config.image.width}" height="${config.image.height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          ${fontCss}
        </style>
        <filter id="textShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="1" dy="1.5" stdDeviation="1" flood-color="#600000" flood-opacity="0.3"/>
        </filter>
      </defs>
      <g>
        ${textElementsSvg}
      </g>
    </svg>
  `;

  // Verify template file exists
  if (!fs.existsSync(config.paths.template)) {
    throw new Error(`Template image not found at ${config.paths.template}`);
  }

  // Composite template image + SVG text overlay
  const outputBuffer = await sharp(config.paths.template)
    .composite([
      {
        input: Buffer.from(svgOverlay),
        top: 0,
        left: 0,
      },
    ])
    .png({ compressionLevel: 8 })
    .toBuffer();

  return outputBuffer;
}

export default generateAboutMeImage;

