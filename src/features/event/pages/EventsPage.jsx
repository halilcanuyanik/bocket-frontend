// REACT HOOKS
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

// COMPONENTS
import Search from '@/components/common/Search';
import AddEventModal from '@/features/event/components/AddEventModal';
import EditEventModal from '@/features/event/components/EditEventModal';
import DeleteEventModal from '@/features/event/components/DeleteEventModal';

// UTILS
import { formatCurrency } from '@/utils/currencyUtils';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <section className="flex-1 min-h-screen bg-gray-100 flex flex-col p-6">
      <div className="w-full h-24 flex flex-col gap-4 justify-between">
        <h1 className="text-black font-bold text-4xl">Events</h1>
        <Search
          endpoint="/shows/events"
          onSuggestionsChange={setEvents}
          placeholder="Events..."
        />
      </div>

      <div className="mt-8 w-full flex-1 flex flex-wrap space-x-4 space-y-4">
        <div
          className="
            group w-72 h-80 rounded-sm shadow-md overflow-hidden relative cursor-pointer
            border border-gray-300 bg-gray-200 flex flex-col items-center justify-center
            hover:bg-gray-300 transition
          "
          onClick={() => setIsAddModalOpen(true)}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl font-bold text-gray-400">+</span>
            <span className="text-gray-400 font-semibold text-lg">
              Add Event
            </span>
          </div>
        </div>

        {events.map((e) => (
          <div
            key={e._id}
            className="group w-72 h-80 rounded-sm shadow-md overflow-hidden relative cursor-pointer border border-gray-400"
            onClick={() => navigate(`/admin/events/${e._id}`)}
          >
            <div className="absolute w-full h-full transition duration-300">
              <div className="absolute w-full h-full bg-gradient-to-b from-black/60 via-transparent to-black/70 z-1"></div>
              <img
                src={e.show?.coverImage}
                className="absolute w-full h-full object-cover transition-all duration-300 group-hover:blur-sm"
                alt={e.show?.title}
              />
            </div>

            <div className="absolute inset-0 flex flex-col gap-2 justify-between p-4 z-2 text-white">
              <div>
                <span className="font-bold text-base block">
                  {e.show?.title}
                </span>

                <span className="text-sm opacity-90 block">
                  {e.venue?.name} • {e.venue?.address}
                </span>

                <span className="text-sm opacity-90 block">
                  {e.venue?.city}, {e.venue?.country}
                </span>

                <span className="text-xs mt-1 block opacity-80">
                  {new Date(e.startTime).toLocaleDateString()} •{' '}
                  {new Date(e.startTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-sm font-semibold">
                  <span>🎟 {e.availableTickets}</span>
                  {e.pricing && (
                    <span>
                      {formatCurrency(e.pricing.currency)}
                      {e.pricing.base}
                    </span>
                  )}
                </div>

                <div className="flex items-center overflow-hidden relative">
                  {e.show?.performers.slice(0, 3).map((p, index) => (
                    <img
                      key={p.id}
                      src={p.avatarImage}
                      className={`
        w-12 h-12 object-cover rounded-full border-2 border-white
        ${index !== 0 ? '-ml-4' : ''} shadow-md
      `}
                    />
                  ))}

                  {e.show?.performers?.length > 3 && (
                    <div className="-ml-3 w-10 h-10 bg-black text-white text-xs flex items-center justify-center rounded-full border-2 border-white">
                      +{e.show.performers.length - 3}
                    </div>
                  )}

                  <div
                    className="
                      absolute right-0 bottom-0 flex gap-2
                      opacity-0 pointer-events-none
                      transition-opacity duration-300
                      group-hover:opacity-100 group-hover:pointer-events-auto
                    "
                  >
                    <button
                      className="px-2 py-1 text-xs text-royal-blue bg-royal-blue/30  hover:bg-royal-blue/40 rounded-sm transition cursor-pointer"
                      onClick={(eClick) => {
                        eClick.stopPropagation();
                        setSelectedEvent(e);
                        setIsEditModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 text-xs text-coral-red bg-coral-red/30  hover:bg-coral-red/40 rounded-sm transition cursor-pointer"
                      onClick={(eClick) => {
                        eClick.stopPropagation();
                        setSelectedEvent(e);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isAddModalOpen && (
        <AddEventModal
          onClose={() => setIsAddModalOpen(false)}
          onAdded={(newEvent) => setEvents((prev) => [...prev, newEvent])}
        />
      )}
      {isEditModalOpen && selectedEvent && (
        <EditEventModal
          event={selectedEvent}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedEvent(null);
          }}
          onUpdated={(updatedEvent) =>
            setEvents((prev) =>
              prev.map((e) => (e._id === updatedEvent._id ? updatedEvent : e))
            )
          }
        />
      )}

      {isDeleteModalOpen && selectedEvent && (
        <DeleteEventModal
          event={selectedEvent}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedEvent(null);
          }}
          onDeleted={(deletedId) =>
            setEvents((prev) => prev.filter((e) => e._id !== deletedId))
          }
        />
      )}
    </section>
  );
}

export default EventsPage;
