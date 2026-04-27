import { useState, useEffect } from 'react';

let cache = null;

export default function useSEO(page) {
  const [seo, setSeo] = useState(cache?.[page] ?? { title: '', description: '' });

  useEffect(() => {
    if (cache) { setSeo(cache[page] ?? { title: '', description: '' }); return; }
    fetch('/api/seo').then(r => r.json()).then(data => {
      cache = data;
      setSeo(data[page] ?? { title: '', description: '' });
    });
  }, [page]);

  return seo;
}
