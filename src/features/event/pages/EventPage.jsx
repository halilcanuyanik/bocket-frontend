// REACT HOOKS
import { useState, useEffect } from 'react';

// REACT ROUTER HOOKS
import { useParams } from 'react-router-dom';

// COMPONENTS
import Loading from '@/components/common/Loading';
import Button from '@/components/ui/Button';

// API
import api from '@/lib/axiosClient';

// UTILS
import { formatCurrency } from '@/utils/currencyFormatter';

// LOGO & ICONS
import calendarIcon from '@/assets/icons/calendar.svg';
import timeIcon from '@/assets/icons/time.svg';
import locationIcon from '@/assets/icons/location.svg';
import venueIcon from '@/assets/icons/venue.svg';

import addressIcon from '@/assets/icons/address.svg';
import capacityIcon from '@/assets/icons/capacity.svg';

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
    <section className="w-screen flex-1 grid grid-cols-[3fr_7fr] bg-gray-100 custom-selection">
      <div className="relative group w-full h-full shadow-xl overflow-hidden">
        <img
          src={event.show.coverImage}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent via-80% to-black"></div>
        <Button
          wrapperClass="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 group-focus:opacity-100
          transition-opacity cursor-pointer"
          size="md"
          children="Edit"
        />
      </div>
      <div className="relative w-full max-h-full mt-4 px-6 flex flex-col gap-4 flex-wrap">
        <h1 className="text-4xl ">{event.show.title}</h1>
        <p className="text-gray-400 text-xl pr-6">{event.show.description}</p>

        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <img src={calendarIcon} />
            <p>date</p>
          </div>
          <div className="flex items-center gap-2">
            <img src={timeIcon} />
            <p>time</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <img src={locationIcon} />
          <p>
            {event.venue.address} - {event.venue.country}, {event.venue.city}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <img src={venueIcon} />
          <p>{event.venue.name}</p>
        </div>
      </div>
    </section>
  );
}
