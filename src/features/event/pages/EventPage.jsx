// REACT HOOKS
import { useState, useEffect, useMemo } from 'react';

// REACT ROUTER HOOKS
import { useParams } from 'react-router-dom';

// COMPONENTS
import Loading from '@/components/common/Loading';
import Button from '@/components/ui/Button';

// API
import api from '@/lib/axiosClient';

// UTILS
import { formatEventTime } from '@/utils/timeUtils.js';
import { formatCurrency } from '@/utils/currencyFormatter';

// LOGO & ICONS
import calendarIcon from '@/assets/icons/calendar.svg';
import timeIcon from '@/assets/icons/time.svg';
import locationIcon from '@/assets/icons/location.svg';
import venueIcon from '@/assets/icons/venue.svg';

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

  const eventStart = useMemo(
    () => (event ? formatEventTime(event.startTime) : null),
    [event]
  );

  const { show, venue, pricing } = event || {};

  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loading size="sm" color="bg-black" />
      </div>
    );

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col lg:flex-row custom-selection relative">
      <div className="relative overflow-hidden h-64 lg:h-full lg:w-[40vw]">
        <img src={show.coverImage} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_0/1)_0%,rgb(0_0_0/0)_10%,rgb(0_0_0/0)_90%,rgb(0_0_0/1)_100%)] lg:hidden" />
        <div className="hidden absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black lg:block" />
      </div>

      <div className="flex flex-col h-full w-full lw:w-[60vw] overflow-y-auto">
        <div className="w-full p-6 flex flex-col gap-3 border-gray-200 border-b-[0.5px] lg:border-hidden">
          <h1 className="text-black font-semibold text-2xl">{show.title}</h1>
          <p>{show.description}</p>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <img src={calendarIcon} />
              <span>{`${eventStart.day} ${eventStart.month} ${eventStart.year}`}</span>
            </div>

            <div className="flex items-center gap-2">
              <img src={timeIcon} />
              <span>{`${eventStart.hour}:${eventStart.minute} ${eventStart.ampm}`}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <img src={locationIcon} />
            <p>
              {venue.address} - {venue.country}, {venue.city}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <img src={venueIcon} />
            <p>{venue.name}</p>
          </div>

          <Button
            wrapperClass="self-center"
            size="md"
            to={`/seats/${event.id}`}
          >
            Buy {formatCurrency(pricing.currency)}
            {pricing.base}
          </Button>
        </div>
      </div>
    </div>
  );
}
