// REACT HOOKS
import { useState, useEffect } from 'react';

// REACT ROUTER HOOKS
import { useParams, useNavigate } from 'react-router-dom';

// COMPONENTS
import Loading from '@/components/common/Loading';
import ZoomControl from '@/components/ui/ZoomControl';
import SeatInspection from '@/features/venue/pages/SeatInspection';
import EditEventModal from '@/features/event/components/EditEventModal';
import DeleteEventModal from '@/features/event/components/DeleteEventModal';

// ICONS
import dateIcon from '@/assets/icons/event.svg';
import timeIcon from '@/assets/icons/time.svg';
import performerIcon from '@/assets/icons/performer.svg';
import venueIcon from '@/assets/icons/venue.svg';
import addressIcon from '@/assets/icons/address.svg';
import locationIcon from '@/assets/icons/location.svg';

// APIs
import api from '@/lib/axiosClient';

// UTILS
import { formatEventTime } from '@/utils/timeUtils';

export default function SeatPricingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const formattedTime = event?.startTime
    ? formatEventTime(event.startTime)
    : null;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/shows/events/${id}`);
        setEvent(response.data.data);

        const initialScale = response.data.data?.eventSeatMap?.meta?.scale || 1;
        setScale(initialScale);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleZoom = (delta) => {
    setScale((prev) => Math.max(0.2, Math.min(3, prev + delta)));
  };

  if (isLoading)
    return (
      <div className="flex-1 h-screen bg-gray-100 flex justify-center items-center">
        <Loading size="sm" color="bg-black" />
      </div>
    );

  return (
    <section className="flex flex-1 min-h-screen bg-gray-100">
      <div className="relative flex-1 flex flex-col pr-48">
        <ZoomControl
          wrapperClass="absolute top-4 left-4 z-1"
          scale={scale}
          onZoom={handleZoom}
        />
        <SeatInspection event={event} scale={scale} />
      </div>
      <div className="fixed right-0 top-0 w-48 h-screen bg-gray-200 grid grid-rows-3">
        <div className="w-full h-full p-2 border-b border-gray-400/30 flex flex-col gap-2">
          <span className="text-sm text-black text-center font-semibold">
            {event.show.title}
          </span>
          <div className="flex gap-2 items-center">
            <img src={dateIcon} className="w-6 h-6" />
            <span className="text-xs">
              {formattedTime.day} {formattedTime.month} {formattedTime.year}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <img src={timeIcon} className="w-6 h-6" />
            <span className="text-xs">
              {formattedTime.hour}:{formattedTime.minute} {formattedTime.ampm}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <img src={performerIcon} className="w-6 h-6" />
            <span className="text-xs">{event.show.performers[0].name}</span>
          </div>
        </div>

        <div className="w-full h-full p-2 flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <img src={venueIcon} className="w-6 h-6" />
            <span className="text-xs">{event.venue.name}</span>
          </div>

          <div className="flex gap-2 items-center">
            <img src={addressIcon} className="w-6 h-6" />
            <span className="text-xs">{event.venue.address}</span>
          </div>

          <div className="flex gap-2 items-center">
            <img src={locationIcon} className="w-6 h-6" />
            <span className="text-xs">
              {event.venue.city}, {event.venue.country}
            </span>
          </div>
        </div>

        <div className="w-full h-full p-2 flex flex-col justify-end gap-2">
          <button
            className="py-2 text-xs text-royal-blue bg-royal-blue/30 hover:bg-royal-blue/40 border border-royal-blue rounded-sm transition cursor-pointer"
            onClick={() => setIsEditOpen(true)}
          >
            Edit
          </button>
          <button
            className="py-2 text-xs text-coral-red bg-coral-red/30 hover:bg-coral-red/40 border border-coral-red rounded-sm transition cursor-pointer"
            onClick={() => setIsDeleteOpen(true)}
          >
            Delete
          </button>
          <button
            className="py-2 text-xs text-white bg-black hover:bg-black/80 border border-black rounded-sm transition cursor-pointer"
            onClick={() => navigate(`/admin/events/update-pricing/${id}`)}
          >
            Edit Pricing
          </button>
        </div>
      </div>
      {isEditOpen && (
        <EditEventModal
          event={event}
          onClose={() => setIsEditOpen(false)}
          onUpdated={(updatedEvent) => setEvent(updatedEvent)}
        />
      )}
      {isDeleteOpen && (
        <DeleteEventModal
          event={event}
          onClose={() => setIsDeleteOpen(false)}
          onDeleted={() => {
            navigate('/admin/events');
          }}
        />
      )}
    </section>
  );
}
