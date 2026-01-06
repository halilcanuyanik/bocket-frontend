// REACT HOOKS
import { useState, useEffect } from 'react';

// APIs
import api from '@/lib/axiosClient';

export function useLandingEvents() {
  const [data, setData] = useState({
    topRated: [],
    upcoming: [],
    almostSoldOut: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAll = async () => {
      try {
        const [t, u, a] = await Promise.all([
          api.get('/shows/top-rated'),
          api.get('/shows/upcoming'),
          api.get('/shows/almost-sold-out'),
        ]);

        if (!isMounted) return;

        setData({
          topRated: t.data.data,
          upcoming: u.data.data,
          almostSoldOut: a.data.data,
        });
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchAll();

    return () => {
      isMounted = false;
    };
  }, []);
  return { ...data, isLoading, error };
}
