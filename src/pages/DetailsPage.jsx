// REACT

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '@/lib/axiosClient';

// COMPONENTS
import Loading from '@/components/common/Loading';
import Button from '@/components/ui/Button';
import Tile from '@/components/ui/Tile';

// UTILS
import { formatDate, formatTime } from '@/utils/DateFormatter';
import { formatCurrency } from '../utils/currencyFormatter';

// ICONS
import calendarIcon from '@/assets/icons/calendar.svg';
import timeIcon from '@/assets/icons/time.svg';
import locationIcon from '@/assets/icons/location.svg';
import venueIcon from '@/assets/icons/venue.svg';

function DetailsPage() {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [otherEvents, setOtherEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOtherLoading, setIsOtherLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/shows/events/${id}`);
        const data = response.data.data;
        setEventData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (!eventData?.show?._id) return;

    const fetchOtherEvents = async () => {
      setIsOtherLoading(true);
      try {
        const res = await api.get(`/shows/${eventData.show._id}/events`);
        const allEvents = res.data.data;
        const filtered = allEvents.filter((e) => e._id !== eventData._id);
        setOtherEvents(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setIsOtherLoading(false);
      }
    };

    fetchOtherEvents();
  }, [eventData]);

  return (
    <div className="w-screen min-h-screen flex flex-col lg:flex-row custom-selection relative">
      {isLoading ? (
        <Loading className="absolute top-6/12 left-6/12" />
      ) : !eventData ? (
        <div className="flex items-center justify-center text-white">
          <p className="text-2xl font-semibold text-coral-red custom-selection">
            Content Not Found!
          </p>
        </div>
      ) : (
        <>
          <div className="relative overflow-hidden h-64 lg:h-full">
            <img
              src={eventData.show.coverImage}
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_0/1)_0%,rgb(0_0_0/0)_10%,rgb(0_0_0/0)_90%,rgb(0_0_0/1)_100%)] lg:hidden" />
          </div>
          <div className="flex flex-col">
            <div className="w-full p-6 flex flex-col gap-3 lg:border-hidden border-gray-200 border-b-[0.5px]">
              <h1 className="text-black font-semibold text-2xl">
                {eventData.show.title}
              </h1>
              <p>{eventData.show.description}</p>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <img src={calendarIcon} />
                  <p>{formatDate(eventData.startTime)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <img src={timeIcon} />
                  <p>{formatTime(eventData.startTime)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <img src={locationIcon} />
                <p>
                  {eventData.venue.address} - {eventData.venue.country},{' '}
                  {eventData.venue.city}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <img src={venueIcon} />
                <p>{eventData.venue.name}</p>
              </div>
              <Button size="md" wrapperClass="rounded-lg self-center">
                Buy {formatCurrency(eventData.pricing.currency)}
                {eventData.pricing.base}
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
                    day={formatDate(e.startTime)}
                    venueName={e.venue.name}
                    hour={formatTime(e.startTime)}
                    address={e.venue.address}
                    price={e.pricing.base}
                    currency={e.pricing.currency}
                    onClick={() => navigate(`/eventDetails/${e._id}`)}
                  />
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DetailsPage;
