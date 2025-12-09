import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '@/components/common/Search';
import AddEventModal from '@/features/event/components/AddEventModal';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="flex-1 h-screen bg-gray-100 flex flex-col p-6">
      <div className="w-full h-24 flex flex-col gap-4 justify-between">
        <h1 className="text-black font-bold text-4xl">Events</h1>
        <div className="flex items-center gap-4">
          <Search
            endpoint={`/shows/events`}
            onSuggestionsChange={setEvents}
            placeholder="Events..."
          />
          <button
            className="px-3 py-1.5 font-semibold text-sm text-white bg-black border border-gray-400 rounded-xl shadow-xl hover:bg-black/80  transition cursor-pointer"
            onClick={() => setAddModalOpen(true)}
          >
            Add Event
          </button>
        </div>
      </div>

      <ul className="w-6/12 bg-white mt-2 rounded-md shadow overflow-y-auto">
        {events.map((e) => (
          <li
            key={e._id}
            className="p-3 flex gap-3 hover:bg-gray-100 cursor-pointer"
            onClick={() => navigate(`/admin/events/${e._id}`)}
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
      {addModalOpen && (
        <AddEventModal
          onClose={() => setAddModalOpen(false)}
          onAdded={(newEvent) => setEvents([...events, newEvent])}
        />
      )}
    </section>
  );
}
