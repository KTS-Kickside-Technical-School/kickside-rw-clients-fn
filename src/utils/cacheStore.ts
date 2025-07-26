// utils/cacheStore.js
const cacheStore = new Map();

export function getCachedValue(key) {
  const entry = cacheStore.get(key);
  if (!entry) return null;

  const { value, timestamp, ttl } = entry;
  const isExpired = Date.now() - timestamp > ttl;

  if (isExpired) {
    cacheStore.delete(key);
    return null;
  }

  return value;
}

export function setCachedValue(key, value, ttl) {
  cacheStore.set(key, {
    value,
    ttl,
    timestamp: Date.now(),
  });
}
