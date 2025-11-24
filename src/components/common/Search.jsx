import { useState, useEffect } from 'react';
import Loading from '@/components/common/Loading';
import api from '@/lib/axiosClient';

export default function Search({
  endpoint,
  onSuggestionsChange,
  placeholder = 'Search...',
}) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      onSuggestionsChange?.([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        setLoading(true);
        const response = await api.get(`${endpoint}/search?query=${query}`);
        const data = response.data.data || [];
        onSuggestionsChange?.(data);
      } catch {
        onSuggestionsChange?.([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="relative w-full lg:w-9/12 xl:w-6/12 font-semibold">
      <div className="flex items-center gap-2 px-3 h-12 bg-gray-200 rounded-md">
        <input
          className="flex-1 bg-transparent outline-none"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {loading && <Loading size="sm" color="bg-black" />}
      </div>
    </div>
  );
}
