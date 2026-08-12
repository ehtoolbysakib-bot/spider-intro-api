import crypto from 'crypto';

// In-memory cache storage with size limit
const cache = new Map();
const MAX_CACHE_SIZE = 250;

/**
 * Creates a deterministic cache key based on query parameter values.
 * @param {Object} data
 * @returns {string}
 */
export function createCacheKey(data = {}) {
  const fields = [
    'name',
    'age',
    'location',
    'religion',
    'relationship',
    'height',
    'birthday',
    'bestie',
    'font_style',
  ];

  const normalizedValues = fields.map((f) => {
    const val = data[f] || '';
    return `${f}:${String(val).trim().toLowerCase()}`;
  });

  const rawKey = normalizedValues.join('|');
  return crypto.createHash('sha256').update(rawKey).digest('hex');
}

/**
 * Retrieves cached image buffer if present.
 * @param {string} key
 * @returns {Buffer | null}
 */
export function getCachedImage(key) {
  if (!key) return null;
  const entry = cache.get(key);
  if (!entry) return null;

  // Touch entry to refresh LRU position
  cache.delete(key);
  cache.set(key, entry);

  return entry.buffer;
}

/**
 * Stores image buffer in cache.
 * @param {string} key
 * @param {Buffer} buffer
 */
export function setCachedImage(key, buffer) {
  if (!key || !buffer) return;

  // Evict oldest entry if cache exceeds maximum size
  if (cache.size >= MAX_CACHE_SIZE) {
    const firstKey = cache.keys().next().value;
    if (firstKey) cache.delete(firstKey);
  }

  cache.set(key, {
    buffer,
    timestamp: Date.now(),
  });
}

/**
 * Clears the cache.
 */
export function clearCache() {
  cache.clear();
}
