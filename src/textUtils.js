/**
 * Utility functions for text processing, XML escaping, parameter normalization, and dynamic font sizing.
 */

/**
 * Escapes special XML/SVG characters to prevent XML injection or rendering breaks.
 * @param {string} str
 * @returns {string}
 */
export function escapeXml(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Decodes, trims, and truncates input parameter according to max length.
 * @param {any} val
 * @param {number} maxLength
 * @returns {string}
 */
export function normalizeText(val, maxLength = 80) {
  if (val === undefined || val === null) return '';
  let str = String(val).trim();
  try {
    str = decodeURIComponent(str);
  } catch {
    // Return original string if decode fails
  }
  str = str.trim();
  if (str.length > maxLength) {
    str = str.substring(0, maxLength);
  }
  return str;
}

/**
 * Calculates appropriate font size for a text string to fit within maxWidth.
 * @param {string} text
 * @param {number} defaultFontSize
 * @param {number} minFontSize
 * @param {number} maxWidth
 * @returns {number}
 */
export function calculateFontSize(text, defaultFontSize = 36, minFontSize = 18, maxWidth = 600) {
  if (!text) return defaultFontSize;
  
  const charCount = text.length;
  const avgCharWidthFactor = 0.58;
  const estimatedWidth = charCount * defaultFontSize * avgCharWidthFactor;

  if (estimatedWidth <= maxWidth) {
    return defaultFontSize;
  }

  // Calculate needed font size
  const calculatedSize = Math.floor((maxWidth / (charCount * avgCharWidthFactor)));
  return Math.max(minFontSize, Math.min(defaultFontSize, calculatedSize));
}

/**
 * Formats text for SVG rendering with fitting font size and XML escaping.
 * @param {string} rawText
 * @param {number} defaultFontSize
 * @param {number} minFontSize
 * @param {number} maxWidth
 * @returns {{ escapedText: string, fontSize: number }}
 */
export function fitText(rawText, defaultFontSize = 36, minFontSize = 18, maxWidth = 600) {
  if (!rawText) {
    return { escapedText: '', fontSize: defaultFontSize };
  }

  const fontSize = calculateFontSize(rawText, defaultFontSize, minFontSize, maxWidth);
  const escapedText = escapeXml(rawText);

  return { escapedText, fontSize };
}

