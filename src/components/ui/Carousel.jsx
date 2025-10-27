import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Loading from '@/components/common/Loading';
import api from '@/lib/axiosClient';

function Carousel() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        console.log(response);
        const fetchedEvents = response.data.data.events;
        setEvents(fetchedEvents);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-80 flex items-center gap-6 px-6">
      {events.length > 0 ? (
        events.map((event) => (
          <Card
            key={event._id}
            coverImage={event.coverImage}
            title={event.title}
            artist={event.performers?.[0]?.name}
          />
        ))
      ) : (
        <div className="w-full flex justify-center">
          <Loading size="md" color="bg-coral-red" />
        </div>
      )}
    </div>
  );
}

export default Carousel;
