import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '@/lib/axiosClient';
import Loading from '@/components/common/Loading';
import Button from '@/components/ui/Button';
import Tile from '@/components/ui/Tile';
import locationIcon from '@/assets/icons/location.svg';

import { formatReadably, formatTime } from '@/utils/DateFormatter';
import { formatCurrency } from '../utils/currencyFormatter';

export default function DetailsPage() {
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useLocation();
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

  return (
    <div className="w-screen min-h-screen flex flex-col custom-selection">
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
            <div
              className="
        absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_0/1)_0%,rgb(0_0_0/0)_10%,rgb(0_0_0/0)_90%,rgb(0_0_0/1)_100%)]
    "
            ></div>
          </div>

          <div className="w-full p-6 flex flex-col items-center gap-3 border-gray-100 border-b-[0.5px]">
            <h1 className="text-black font-semibold text-2xl">
              {eventData.show.title}
            </h1>
            <p className="">{eventData.show.description}</p>
            <Tile
              day={formatReadably(eventData.startTime)}
              venueName={eventData.venue.name}
              hour={formatTime(eventData.startTime)}
              address={eventData.venue.address}
              price={eventData.pricing.base}
              currency={eventData.pricing.currency}
            />
          </div>

          <div className="w-full p-6 flex-col items-center gap-3"></div>
        </>
      )}
    </div>
  );
}
