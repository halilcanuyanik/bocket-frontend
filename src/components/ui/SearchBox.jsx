import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Loading from '../common/Loading';
import api from '@/lib/axiosClient';

function SearchBox() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchEvents = async (value) => {
    setLoading(true);
    try {
      const response = await api.get('events');
      const events = response.data.data.events;

      const filtered = events.filter(
        (e) =>
          e.artist?.toLowerCase().includes(value.toLowerCase()) ||
          e.venue?.toLowerCase().includes(value.toLowerCase()) ||
          e.title?.toLowerCase().includes(value.toLowerCase())
      );

      setSuggestions(filtered);
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
          <div className="flex items-center flex-grow">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Performer, event, venue"
              className="bg-transparent outline-none w-full text-white placeholder-gray-100 font-semibold caret-sky-blue custom-selection text-sm sm:text-base md:text-lg lg:text-xl"
            />
            {loading && (
              <div className="flex items-center flex-shrink-0 ml-2">
                <Loading color="bg-lavender" size="sm" />
              </div>
            )}
          </div>
        </div>
      </div>

      {suggestions.length > 0 && !loading && (
        <ul className="absolute top-14 left-0 w-full rounded-md z-10 p-[2px] bg-gradient-to-r font-semibold from-indigo to-coral-red text-sm sm:text-base md:text-lg lg:text-xl">
          {suggestions.map((event, i) => (
            <li
              key={event.id || i}
              onClick={() => {
                setQuery(event.title);
                setSuggestions([]);
              }}
              className={`flex items-center gap-3 px-3 py-2 text-white bg-black/60 hover:bg-black/80 transition-all cursor-pointer ${
                i === 0 ? 'rounded-t-md' : ''
              } ${i === suggestions.length - 1 ? 'rounded-b-md' : ''}`}
            >
              {event.coverImage && (
                <img
                  src={event.coverImage}
                  alt={event.title}
                  className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                />
              )}

              <div className="flex flex-col flex-grow min-w-0">
                <span className="font-bold truncate">{event.title}</span>
                <span className="text-gray-300 text-xs sm:text-sm truncate">
                  {event.artist || 'Unknown artist'}
                  {event.venue ? ` • ${event.venue}` : ''}
                </span>
              </div>

              {event.date && (
                <span className="text-gray-400 text-xs sm:text-sm flex-shrink-0 ml-2">
                  {new Date(event.date).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;
