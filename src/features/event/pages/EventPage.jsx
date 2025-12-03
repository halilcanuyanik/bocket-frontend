// REACT HOOKS
import { useState, useEffect } from 'react';

// REACT ROUTER HOOKS
import { useParams } from 'react-router-dom';

// COMPONENTS
import Loading from '@/components/common/Loading';
import Button from '@/components/ui/Button';

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
    <section className="w-screen flex-1 bg-gray-100 grid grid-cols-[3fr_7fr] custom-selection">
      <div className="relative group w-full h-full shadow-xl overflow-hidden">
        <img
          src={event.show.coverImage}
          className="w-full h-full object-cover"
        />
        <Button
          wrapperClass="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 group-focus:opacity-100
          transition-opacity cursor-pointer"
          size="md"
          children="Edit"
        />
      </div>
      <div className="relative w-full max-h-full mt-4 px-6 flex flex-col flex-wrap">
        <h1 className="text-6xl text-black">{event.show.title}</h1>
        <p className="text-gray-400 text-xl">{event.show.description}</p>
      </div>
    </section>
  );
}
