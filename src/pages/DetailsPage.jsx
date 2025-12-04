// REACT HOOKS
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// COMPONENTS
import Loading from '@/components/common/Loading';
import Button from '@/components/ui/Button';
import Tile from '@/components/ui/Tile';

// UTILS
import { formatEventTime } from '@/utils/timeUtils';
import { formatCurrency } from '@/utils/currencyFormatter';

// API
import api from '@/lib/axiosClient';

// LOGO & ICONS
import calendarIcon from '@/assets/icons/calendar.svg';
import timeIcon from '@/assets/icons/time.svg';

export default function DetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [otherEvents, setOtherEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOtherLoading, setIsOtherLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await api.get(`/shows/events/${id}`);
        setEvent(response.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getEvents();
  }, [id]);

  useEffect(() => {
    if (!event?.show?._id) return;

    const getOtherEvents = async () => {
      setIsOtherLoading(true);
      try {
        const response = await api.get(`/shows/${event.show._id}/events`);
        const allEvents = response.data.data;
        const filtered = allEvents.filter((e) => e._id !== event._id);
        setOtherEvents(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setIsOtherLoading(false);
      }
    };

    getOtherEvents();
  }, [event]);

  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loading size="sm" color="bg-black" />
      </div>
    );

  return (
    <div className="w-screen min-h-screen flex flex-col lg:grid grid-cols-[3fr_7fr] custom-selection relative">
      <div className="relative overflow-hidden h-64 lg:h-full">
        <img
          src={event.show.coverImage}
          className="w-full lg:h-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_0/1)_0%,rgb(0_0_0/0)_10%,rgb(0_0_0/0)_90%,rgb(0_0_0/1)_100%)] lg:hidden" />

        <div className="absolute inset-0 hidden bg-gradient-to-r from-transparent via-transparent via-80% to-black lg:block"></div>
      </div>
      <div className="flex flex-col">
        <div className="w-full p-6 flex flex-col gap-3 lg:border-hidden border-gray-200 border-b-[0.5px]">
          <h1 className="text-black font-semibold text-6xl">
            {event.show.title}
          </h1>
          <p className="text-2xl">{event.show.description}</p>

          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <img src={timeIcon} />
              <span>
                {formatEventTime(new Date(event.startTime)).hour}:
                {formatEventTime(new Date(event.startTime)).minute}{' '}
                {formatEventTime(new Date(event.startTime)).ampm}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <img src={calendarIcon} />
              <span>
                {formatEventTime(new Date(event.startTime)).day} {}
                {formatEventTime(new Date(event.startTime)).month} {}
                {formatEventTime(new Date(event.startTime)).year}, {}
                {formatEventTime(new Date(event.startTime)).weekday}
              </span>
            </div>
          </div>

          <span className="font-[Lexend] text-4xl text-black">
            {event.venue.name}
          </span>

          <Button size="md" to={`/seats/${event.id}`}>
            Buy {formatCurrency(event.pricing.currency)}
            {event.pricing.base}
          </Button>
        </div>

        <div className="w-full p-6 flex flex-col gap-3 relative">
          {isOtherLoading ? (
            <Loading className="absolute top-6/12 left-6/12" />
          ) : otherEvents.length === 0 ? (
            <p className="text-center text-gray-500">No other events!</p>
          ) : (
            otherEvents.map((e) => (
              <Tile
                key={e._id}
                day={e.startTime}
                venueName={e.venue.name}
                hour={e.startTime}
                address={e.venue.address}
                price={e.pricing.base}
                currency={e.pricing.currency}
                onClick={() => navigate(`/event-details/${e._id}`)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
