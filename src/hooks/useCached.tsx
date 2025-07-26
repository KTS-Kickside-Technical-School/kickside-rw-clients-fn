// hooks/useCachedFetch.js or .ts
import { useEffect, useState } from 'react';
import { getCachedValue, setCachedValue } from '../utils/cacheStore';

function useCachedFetch({ key, fetcher, ttl = 300000 }) {
  const [data, setData] = useState(() => getCachedValue(key));
  const [loading, setLoading] = useState(data === null);

  useEffect(() => {
    if (!data) {
      fetcher()
        .then((res) => {
          setCachedValue(key, res, ttl);
          setData(res);
        })
        .finally(() => setLoading(false));
    }
  }, [key]);

  return { data, loading };
}

export default useCachedFetch;
