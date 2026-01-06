// REACT HOOKS
import { useState, useEffect } from 'react';

// REACT ROUTER HOOKS
import { useParams } from 'react-router-dom';

// COMPONENTS
import Loading from '@/components/common/Loading';
import Button from '@/components/ui/Button';
import VenueInfoBar from '@/features/venue/components/VenueInfoBar';
import ZoomControl from '@/components/ui/ZoomControl';

// PAGES
import SeatInspectionPage from '@/features/venue/pages/SeatInspectionPage';

// APIs
import api from '@/lib/axiosClient';

export default function EventPage() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const isModalOpen = isEditOpen || isDeleteOpen;

  useEffect(() => {
    const getEvent = async () => {
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

    getEvent();
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
    <div className="flex-1 min-h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-4">
          <VenueInfoBar venue={event.venue} />
          <ZoomControl scale={scale} onZoom={handleZoom} />
          <button
            className="px-3 py-1.5 font-semibold text-sm text-white bg-black border border-gray-400 rounded-xl shadow-md hover:bg-black/80 transition cursor-pointer"
            onClick={() => setIsEditOpen(true)}
          >
            Edit
          </button>
          <button
            className="px-3 py-1.5 font-semibold text-sm text-coral-red bg-coral-red/20 border-gray-400 rounded-xl shadow-md hover:bg-coral-red/40 transition cursor-pointer"
            onClick={() => setIsDeleteOpen(true)}
          >
            Delete
          </button>
        </div>
        <SeatInspectionPage event={event} scale={scale} />
      </div>

      <div
        className={`${
          isModalOpen ? 'hidden' : ''
        }fixed bottom-6 left-1/2 -translate-x-1/2 z-50`}
      >
        <Button
          size="sm"
          children="Edit Seat Prices"
          to={`/admin/events/update-pricing/${id}`}
        />
      </div>
    </div>
  );
}
