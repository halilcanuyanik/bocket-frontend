// REACT HOOKS
import { useState, useEffect } from 'react';

// REACT ROUTER HOOKS
import { useParams } from 'react-router-dom';

// COMPONENTS
import Loading from '@/components/common/Loading';

//PAGES
import SeatInspectionPage from '@/pages/admin/SeatInspectionPage';

// API
import api from '@/lib/axiosClient';

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await api.get(`/shows/events/${id}`);
        const data = response.data.data;
        setEvent(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getEvent();
  }, [id]);

  return (
    <section className="w-screen flex-1 bg-gray-100 flex flex-col custom-selection">
      {isLoading ? (
        <div className="w-full flex-1 flex justify-center items-center">
          <Loading size="md" color="bg-black" />
        </div>
      ) : (
        <div className="flex items-center">
          <SeatInspectionPage event={event} />
        </div>
      )}
    </section>
  );
}
