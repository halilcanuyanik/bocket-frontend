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
      const response = await api.get('/events/instances?limit=50');
      const instances = response.data.data;

      const filtered = instances.filter((i) => {
        const performerMatch = i.event.performers?.some((p) =>
          p.name?.toLowerCase().includes(value.toLowerCase())
        );

        const venueMatch = i.venue?.name
          ?.toLowerCase()
          .includes(value.toLowerCase());
        const titleMatch = i.event?.title
          ?.toLowerCase()
          .includes(value.toLowerCase());

        return performerMatch || venueMatch || titleMatch;
      });

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

      {suggestions.map((instance, i) => (
        <li
          key={instance._id || i}
          onClick={() => {
            setQuery(instance.event.title);
            setSuggestions([]);
          }}
          className={`flex items-center gap-3 px-3 py-2 text-white bg-black/60 hover:bg-black/80 transition-all cursor-pointer ${
            i === 0 ? 'rounded-t-md' : ''
          } ${i === suggestions.length - 1 ? 'rounded-b-md' : ''}`}
        >
          {instance.event.coverImage && (
            <img
              src={instance.event.coverImage}
              alt={instance.event.title}
              className="w-12 h-12 object-cover rounded-md flex-shrink-0"
            />
          )}

          <div className="flex flex-col flex-grow min-w-0">
            <span className="font-bold truncate">{instance.event.title}</span>
            <span className="text-gray-300 text-xs sm:text-sm truncate">
              {[instance.event.performers?.[0]?.name, instance.venue?.name]
                .filter(Boolean)
                .join(' • ') || 'Unknown'}
            </span>
          </div>
        </li>
      ))}
    </div>
  );
}

export default SearchBox;
