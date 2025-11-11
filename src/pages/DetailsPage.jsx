import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '@/lib/axiosClient';
import Loading from '@/components/common/Loading';
import Button from '@/components/ui/Button';
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
    <div className="w-screen h-screen flex gap-24 bg-gray-900 custom-selection">
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
          <div className="min-h-screen w-8/12 px-12 flex flex-col scroll-auto">
            <div className="w-full flex flex-col gap-6 my-12 pb-6 border-gray-100 border-b-[1px]">
              <h1 className="font-semibold text-5xl text-center">
                {eventData.show.title}
              </h1>
              <p className="text-xl">{eventData.show.description}</p>
              <div className="flex justify-start gap-24">
                <div className="flex gap-4 text-xl text-lively-orange">
                  <p>{formatReadably(eventData.startTime)}</p>
                  <p>{formatTime(eventData.startTime)}</p>
                </div>
                <div className="flex gap-2 text-xl text-royal-blue items-center">
                  <img src={locationIcon} />
                  <span>{eventData.venue.name} - </span>
                  <span>{eventData.venue.country},</span>
                  <span>{eventData.venue.city}</span>
                </div>
              </div>
              <div className="flex gap-12">
                <Button
                  size="md"
                  wrapperClass="rounded-md"
                  children=""
                >{`Buy ${formatCurrency(eventData.pricing.currency)}${
                  eventData.pricing.base
                }`}</Button>
              </div>
            </div>
            <div className=""></div>
          </div>
          <div className="h-screen w-4/12 relative overflow-hidden">
            <img
              src={eventData.show.coverImage}
              className="h-full w-full object-cover"
            />

            <div className="absolute bottom-4 left-4 bg-gray-900 border-2 border-coral-red text-white p-2 rounded-lg flex items-center">
              <span className="hot-text">
                ⭐ {eventData.show.averageRating}/5 (
                {`${eventData.show.ratingCount}`})
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
