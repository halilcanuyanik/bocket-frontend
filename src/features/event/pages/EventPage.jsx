// REACT HOOKS
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// REACT ROUTER HOOKS
import { useParams } from 'react-router-dom';

// COMPONENTS
import Loading from '@/components/common/Loading';
import VenueInfoBar from '@/features/venue/components/VenueInfoBar';
import EventInfoBox from '@/features/event/components/EventInfoBox';
import Button from '@/components/ui/Button';
import SeatInspectionPage from '@/features/venue/pages/SeatInspectionPage';

// API
import api from '@/lib/axiosClient';

// UTILS
import { formatCurrency } from '@/utils/currencyFormatter';

export default function EventPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const isModalOpen = isEditOpen || isDeleteOpen;

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await api.get(`/shows/events/${id}`);
        setEvent(response.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getEvent();
  }, [id]);

  if (isLoading)
    return (
      <div className="w-screen flex-1 flex justify-center items-center bg-gray-100">
        <Loading size="sm" color="bg-black" />
      </div>
    );

  return (
    <div className="w-screen flex-1 bg-gray-100 flex flex-col custom-selection">
      <div className="flex items-center relative">
        <VenueInfoBar venue={event.venue} />
        <EventInfoBox
          title={event.show.title}
          performer={event.show.performers[0].name}
          time={event.startTime}
        />
        <Button size="sm" wrapperClass="mr-4" children="Edit" />
        <button className="text-coral-red bg-coral-red/20 py-1 px-3 rounded-md hover:bg-coral-red/40 cursor-pointer">
          Delete
        </button>
      </div>
      <div className="grow">
        <SeatInspectionPage seatMap={event.eventSeatMap} />
        <div
          className={`${
            isModalOpen ? 'hidden' : ''
          }fixed bottom-6 left-1/2 -translate-x-1/2 z-50`}
        >
          <Button size="sm" children="Edit Seat Prices" />
        </div>
      </div>
    </div>
  );
}
