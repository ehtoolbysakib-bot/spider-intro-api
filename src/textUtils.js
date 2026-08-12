/**
 * Utility functions for text processing, XML escaping, parameter normalization, and dynamic font sizing.
 */

/**
 * Map of standard characters to Mathematical Script Bold Unicode characters
 */
const scriptCharMap = {
  'A': '𝓐', 'B': '𝓑', 'C': '𝓒', 'D': '𝓓', 'E': '𝓔', 'F': '𝓕', 'G': '𝓖',
  'H': '𝓗', 'I': '𝓘', 'J': '𝓙', 'K': '𝓚', 'L': '𝓛', 'M': '𝓜', 'N': '𝓝',
  'O': '𝓞', 'P': '𝓟', 'Q': '𝓠', 'R': '𝓡', 'S': '𝓢', 'T': '𝓣', 'U': '𝓤',
  'V': '𝓥', 'W': '𝓦', 'X': '𝓧', 'Y': '𝓨', 'Z': '𝓩',
  'a': '𝓐', 'b': '𝓑', 'c': '𝓒', 'd': '𝓓', 'e': '𝓔', 'f': '𝓕', 'g': '𝓖',
  'h': '𝓗', 'i': '𝓘', 'j': '𝓙', 'k': '𝓚', 'l': '𝓛', 'm': '𝓜', 'n': '𝓝',
  'o': '𝓞', 'p': '𝓟', 'q': '𝓠', 'r': '𝓡', 's': '𝓢', 't': '𝓣', 'u': '𝓤',
  'v': '𝓥', 'w': '𝓦', 'x': '𝓧', 'y': '𝓨', 'z': '𝓩',
  '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', '0': '0'
};

/**
 * Converts English letters to Mathematical Script Bold Unicode characters (e.g. a -> 𝓐).
 * @param {string} text
 * @returns {string}
 */
export function toFancyScript(text) {
  if (!text || typeof text !== 'string') return '';
  return Array.from(text).map(ch => scriptCharMap[ch] || scriptCharMap[ch.toLowerCase()] || ch).join('');
}

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
  
  const charCount = Array.from(text).length;
  const avgCharWidthFactor = 0.65;
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
 * Convert text characters to stylized script characters (e.g. a -> 𝓐).
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

  const scriptText = toFancyScript(rawText);
  const fontSize = calculateFontSize(scriptText, defaultFontSize, minFontSize, maxWidth);
  const escapedText = escapeXml(scriptText);

  return { escapedText, fontSize };
}
