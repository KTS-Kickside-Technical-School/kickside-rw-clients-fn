import { useEffect, useState } from 'react';

interface CacheOptions {
  key: string;
  fetcher: () => Promise<any>;
  ttl?: number; // in milliseconds, default 5 minutes
}

const useCachedFetch = <T = any,>({
  key,
  fetcher,
  ttl = 5 * 60 * 1000,
}: CacheOptions) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const now = Date.now();
    const cached = localStorage.getItem(key);
    const cachedTime = localStorage.getItem(`${key}_time`);

    const setAndCache = (fetchedData: T) => {
      setData(fetchedData);
      localStorage.setItem(key, JSON.stringify(fetchedData));
      localStorage.setItem(`${key}_time`, now.toString());
    };

    const fetchAndUpdate = async () => {
      try {
        const result = await fetcher();
        setAndCache(result);
      } catch (err) {
        console.error('Fetch failed for key:', key, err);
      } finally {
        setLoading(false);
      }
    };

    if (cached && cachedTime && now - parseInt(cachedTime) < ttl) {
      setData(JSON.parse(cached));
      setLoading(false);

      // Background revalidation
      fetcher().then(setAndCache).catch(console.error);
    } else {
      fetchAndUpdate();
    }
  }, [key, fetcher, ttl]);

  return { data, loading };
};

export default useCachedFetch;
