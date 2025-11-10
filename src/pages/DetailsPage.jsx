import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '@/lib/axiosClient';
import Loading from '@/components/common/Loading';

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
        const data =
          type === 'show' ? response.data.data : response.data.data.show;
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
    <div className="w-screen h-screen bg-gray-900 grid grid-cols-7 grid-rows-5 custom-selection">
      {isLoading ? (
        <div className="col-span-7 row-span-5 flex items-center justify-center">
          <Loading />
        </div>
      ) : !eventData ? (
        <div className="col-span-7 row-span-5 flex items-center justify-center text-white">
          <p className="text-2xl font-semibold text-coral-red custom-selection">
            Content Not Found!
          </p>
        </div>
      ) : (
        <>
          <div className="w-7/12 col-start-1 col-span-3 row-start-2 row-span-3 place-self-center flex justify-center item">
            <img
              src={eventData.coverImage}
              alt={eventData.title || 'cover image'}
              className="h-full object-contain rounded-lg"
            />
          </div>
          <div className="w-9/12 h-full col-start-4 col-span-4 row-start-2 row-span-3 place-self-center rounded-lg flex flex-col gap-2">
            <h2 className="text-3xl">{eventData.title}</h2>
            <ul className="flex text-white">
              {eventData.performers.map((p) => {
                return <li>{p.name}</li>;
              })}
            </ul>
            <p className="text-gray-300 text-lg">{eventData.description}</p>
            <p className="text-gray-300 text-lg">
              ⭐ {eventData.averageRating} ({eventData.ratingCount})
            </p>
          </div>
        </>
      )}
    </div>
  );
}
