// REACT HOOKS
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '@/lib/axiosClient';

// COMPONENTS
import Loading from '@/components/common/Loading';
import Button from '@/components/ui/Button';

//PAGES
import SeatInspectionPage from './SeatInspectionPage';

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeatMap, setHasSeatMap] = useState(false);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await api.get(`/shows/events/${id}`);
        const data = response.data.data;
        setEvent(data);
        if (data.eventSeatMap) {
          setHasSeatMap(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getEvent();
  }, [id]);

  useEffect(() => {
    if (!event?.show?._id) return;
  }, [event]);

  return (
    <section className="w-screen flex-1 bg-gray-100 flex flex-col custom-selection relative">
      {isLoading ? (
        <Loading
          className="absolute top-6/12 left-6/12"
          size="md"
          color="bg-black"
        />
      ) : !event ? (
        <div className="flex items-center justify-center text-white">
          <p className="text-2xl font-semibold text-coral-red custom-selection">
            Content Not Found!
          </p>
        </div>
      ) : (
        <>
          {hasSeatMap && (
            <SeatInspectionPage event={event} seatMap={event.eventSeatMap} />
          )}
        </>
      )}
    </section>
  );
}
