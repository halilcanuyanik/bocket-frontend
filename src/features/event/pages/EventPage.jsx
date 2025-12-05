// REACT HOOKS
import { useState, useEffect, useMemo } from 'react';

// REACT ROUTER HOOKS
import { useParams } from 'react-router-dom';

// COMPONENTS
import Loading from '@/components/common/Loading';
import VenueInfoBar from '@/features/venue/components/VenueInfoBar';
import EventTimeBar from '@/features/event/components/EventTimeBar';

// API
import api from '@/lib/axiosClient';

// UTILS
import { formatCurrency } from '@/utils/currencyFormatter';

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await api.get(`/shows/events/${id}`);
        console.log(response.data.data);
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
      <div className="w-screen h-screen flex justify-center items-center">
        <Loading size="sm" color="bg-black" />
      </div>
    );

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col lg:flex-row custom-selection relative">
      <div className="flex">
        <VenueInfoBar venue={event.venue} />
        <EventTimeBar time={event.startTime} />
      </div>
    </div>
  );
}
