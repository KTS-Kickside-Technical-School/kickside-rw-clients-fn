// utils/cacheStore.js
const cacheStore = new Map();

export function getCachedValue(key: any) {
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

export function setCachedValue(key: any, value: any, ttl: any) {
  cacheStore.set(key, {
    value,
    ttl,
    timestamp: Date.now(),
  });
}
