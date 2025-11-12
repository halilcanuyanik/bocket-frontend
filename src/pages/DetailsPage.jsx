import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '@/lib/axiosClient';
import Loading from '@/components/common/Loading';
import Button from '@/components/ui/Button';
import Tile from '@/components/ui/Tile';

import { formatDate, formatTime } from '@/utils/DateFormatter';
import { formatCurrency } from '../utils/currencyFormatter';

import calendarIcon from '@/assets/icons/calendar.svg';
import timeIcon from '@/assets/icons/time.svg';
import locationIcon from '@/assets/icons/location.svg';
import venueIcon from '@/assets/icons/venue.svg';

export default function DetailsPage() {
  const [eventData, setEventData] = useState(null);
  const [otherEvents, setOtherEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOtherLoading, setIsOtherLoading] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const endpoint = state?.eventEndpoint;
  const type = state?.type;

  useEffect(() => {
    if (!endpoint) {
      console.warn('Endpoint not found');
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await api.get(endpoint);
        const data = response.data.data;
        setEventData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint, type]);

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
    <div className="w-screen min-h-screen flex flex-col custom-selection relative">
      {isLoading ? (
        <Loading className="absolute top-6/12 left-6/12" />
      ) : !eventData ? (
        <div className="col-span-7 row-span-5 flex items-center justify-center text-white">
          <p className="text-2xl font-semibold text-coral-red custom-selection">
            Content Not Found!
          </p>
        </div>
      ) : (
        <>
          <div className="h-12 w-full bg-black flex items-center"></div>

          <div className="relative overflow-hidden h-64">
            <img
              src={eventData.show.coverImage}
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_0/1)_0%,rgb(0_0_0/0)_10%,rgb(0_0_0/0)_90%,rgb(0_0_0/1)_100%)]" />
          </div>

          <div className="w-full p-6 flex flex-col gap-3 border-gray-200 border-b-[0.5px]">
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
          </div>

          <div className="w-full p-6 flex flex-col gap-3 relative">
            {isOtherLoading ? (
              <Loading className="absolute top-6/12 left-6/12" />
            ) : otherEvents.length === 0 ? (
              <p className="text-center text-gray-500">No other events!</p>
            ) : (
              otherEvents.map((ev) => (
                <Tile
                  key={ev._id}
                  day={formatDate(ev.startTime)}
                  venueName={ev.venue.name}
                  hour={formatTime(ev.startTime)}
                  address={ev.venue.address}
                  price={ev.pricing.base}
                  currency={ev.pricing.currency}
                  onClick={() =>
                    navigate('/details', {
                      state: { eventEndpoint: `/events/${ev._id}`, type },
                    })
                  }
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
