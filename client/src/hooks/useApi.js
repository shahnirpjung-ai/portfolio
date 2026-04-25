import { useState, useEffect } from 'react';

export function useApi(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api${endpoint}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => { setData(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [endpoint]);

  return { data, loading, error };
}
