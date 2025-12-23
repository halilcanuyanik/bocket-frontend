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
    <div className="relative w-full">
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg border border-gray-200 outline-none focus-within:ring-1 focus-within:ring-gray-400">
        <input
          className="flex-1 outline-none text-gray-700"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {loading && <Loading size="sm" color="bg-black" />}
      </div>
    </div>
  );
}
