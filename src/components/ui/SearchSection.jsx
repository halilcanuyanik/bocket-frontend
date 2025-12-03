import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '@/components/common/Search';

export default function SearchSection() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  return (
    <section className="relative w-screen p-6 flex flex-col gap-4 items-center">
      <p className="text-md font-semibold text-gray-300">SEARCH</p>

      <Search
        endpoint={`/shows`}
        onSuggestionsChange={setEvents}
        placeholder="Event, Venue or Performer..."
      />

      {events.length > 0 && (
        <ul className="w-full bg-white mt-2 rounded-md shadow max-h-72 overflow-y-auto">
          {events.map((e) => (
            <li
              key={e._id}
              className="p-3 flex gap-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate(`/event-details/${e._id}`)}
            >
              {e.show.coverImage && (
                <img
                  src={e.show.coverImage}
                  className="w-12 h-12 rounded-md object-cover"
                />
              )}

              <div className="flex flex-col">
                <span className="font-semibold">{e.show.title}</span>
                <span className="text-xs text-gray-500">
                  {[e.show.performers?.[0]?.name, e.venue?.name]
                    .filter(Boolean)
                    .join(' • ')}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
