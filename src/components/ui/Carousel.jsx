import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Loading from '@/components/common/Loading';
import api from '@/lib/axiosClient';

function Carousel({ label, endpoint, textStyle }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get(endpoint);
        const fetchedEvents = response.data.data.events;
        setEvents(fetchedEvents);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, [endpoint]);

  return (
    <div className="min-h-80 flex flex-col items-center gap-6 py-8 px-6 border-[1]">
      <p className={`text-center font-semibold ${textStyle}`}>{label}</p>
      <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide">
        <div className="flex gap-16 mx-12">
          {events.length > 0 ? (
            events.map((event, i) => (
              <Card
                key={event._id}
                order={i + 1}
                coverImage={event.coverImage}
                title={event.title}
                artist={event.performers?.[0]?.name}
                textStyle={textStyle}
              />
            ))
          ) : (
            <div className="w-full flex justify-center">
              <Loading size="lg" color="bg-coral-red" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
