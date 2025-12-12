// REACT HOOKS
import { useEffect, useState, useMemo } from 'react';

// REACT ROUTER HOOKS
import { useNavigate, useParams } from 'react-router-dom';

// COMPONENTS
import Loading from '@/components/common/Loading';
import Button from '@/components/ui/Button';
import Tile from '@/components/ui/Tile';

// UTILS
import { formatEventTime } from '@/utils/timeUtils';
import { formatCurrency } from '../utils/currencyFormatter';

// APIs
import api from '@/lib/axiosClient';

// ICONS
import calendarIcon from '@/assets/icons/calendar.svg';
import timeIcon from '@/assets/icons/time.svg';
import locationIcon from '@/assets/icons/location.svg';
import venueIcon from '@/assets/icons/venue.svg';

export default function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [otherEvents, setOtherEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [otherLoading, setOtherLoading] = useState(false);

  useEffect(() => {
    const getEvent = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/shows/events/${id}`);
        setEvent(response.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getEvent();
  }, [id]);

  useEffect(() => {
    if (!event?.show?._id) return;

    const getOthers = async () => {
      setOtherLoading(true);
      try {
        const response = await api.get(`/shows/${event.show._id}/events`);
        setOtherEvents(response.data.data.filter((e) => e._id !== event._id));
      } catch (err) {
        console.error(err);
      } finally {
        setOtherLoading(false);
      }
    };

    getOthers();
  }, [event]);

  const eventStart = useMemo(
    () => (event ? formatEventTime(event.startTime) : null),
    [event]
  );

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loading />
      </div>
    );

  if (!event)
    return (
      <div className="w-full h-screen flex items-center justify-center text-white">
        <p className="text-2xl font-semibold text-coral-red">
          Content Not Found!
        </p>
      </div>
    );

  const { show, venue, pricing } = event;

  return (
    <div className="w-screen h-screen flex flex-col lg:flex-row custom-selection relative">
      <div className="relative overflow-hidden h-64 lg:h-full lg:w-[40vw]">
        <img src={show.coverImage} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_0/1)_0%,rgb(0_0_0/0)_10%,rgb(0_0_0/0)_90%,rgb(0_0_0/1)_100%)] lg:hidden" />
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
            <span>
              {venue.address} - {venue.country}, {venue.city}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <img src={venueIcon} />
            <span>{venue.name}</span>
          </div>

          <Button
            wrapperClass="self-center"
            size="md"
            to={`/event-seats/${event.id}`}
          >
            Buy {formatCurrency(pricing.currency)}
            {pricing.base}
          </Button>
        </div>

        <div className="w-full p-6 flex flex-col gap-3 relative">
          {otherLoading ? (
            <Loading className="absolute top-6/12 left-6/12" />
          ) : otherEvents.length === 0 ? (
            <span className="text-center text-gray-500">No other events!</span>
          ) : (
            otherEvents.map((e) => {
              const t = formatEventTime(e.startTime);
              return (
                <Tile
                  key={e._id}
                  day={`${t.day} ${t.month} ${t.year}`}
                  venueName={e.venue.name}
                  hour={`${t.hour}:${t.minute} ${t.ampm}`}
                  address={e.venue.address}
                  price={e.pricing.base}
                  currency={e.pricing.currency}
                  onClick={() => navigate(`/event-details/${e._id}`)}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
