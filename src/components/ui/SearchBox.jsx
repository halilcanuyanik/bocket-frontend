import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Loading from '../common/Loading';
import api from '@/lib/axiosClient';

function SearchBox() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleClick = (eventId) => {
    setSuggestions([]);
    navigate(`/eventDetails/${eventId}`);
  };

  const searchEvents = async (value) => {
    setLoading(true);
    try {
      const response = await api.get(
        `/shows/search?query=${encodeURIComponent(value)}`
      );
      const events = response.data.data || [];

      setSuggestions(events);
    } catch (err) {
      console.error(err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      searchEvents(query);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="relative w-full max-w-[650px] z-50">
      <div className="p-[2px] rounded-md bg-gradient-to-r from-indigo to-sky-blue">
        <div className="flex items-center gap-2 w-full h-12 sm:h-14 md:h-16 px-3 bg-black/80 rounded-md">
          <FaSearch className="text-lavender text-lg sm:text-xl flex-shrink-0" />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Performer, event, venue"
            className="bg-transparent outline-none w-full text-white placeholder-gray-100 font-semibold caret-sky-blue custom-selection text-sm sm:text-base md:text-lg lg:text-xl"
          />
          {loading && <Loading color="bg-lavender" size="sm" />}
        </div>
      </div>

      {suggestions.length > 0 && (
        <ul
          className="
            absolute top-full left-0 w-full
            bg-black/80 border border-white/10 backdrop-blur-sm mt-2 rounded-md overflow-y-auto max-h-[300px] z-50
          "
        >
          {suggestions.map((e, i) => (
            <li
              key={e._id || i}
              onClick={() => handleClick(e._id)}
              className="
                flex items-center gap-3 px-3 py-2
                text-white hover:bg-black/60
                cursor-pointer transition
              "
            >
              {e.show.coverImage && (
                <img
                  src={e.show.coverImage}
                  alt={e.show.title}
                  className="w-12 h-12 object-cover rounded-md"
                />
              )}

              <div className="flex flex-col flex-grow min-w-0">
                <span className="font-bold truncate">{e.show.title}</span>
                <span className="text-gray-300 text-xs sm:text-sm truncate">
                  {[e.show.performers?.[0]?.name, e.venue?.name]
                    .filter(Boolean)
                    .join(' • ') || 'Unknown'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;
