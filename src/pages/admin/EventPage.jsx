// REACT
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '@/lib/axiosClient';

// COMPONENTS
import Loading from '@/components/common/Loading';
import Button from '@/components/ui/Button';

//PAGES
import SeatInspectionPage from './SeatInspectionPage';

// UTILS
import { formatDate, formatTime } from '@/utils/DateFormatter';
import { formatCurrency } from '@/utils/CurrencyFormatter';

// ICONS
import calendarIcon from '@/assets/icons/calendar.svg';
import timeIcon from '@/assets/icons/time.svg';
import locationIcon from '@/assets/icons/location.svg';
import venueIcon from '@/assets/icons/venue.svg';
import addressIcon from '@/assets/icons/address.svg';
import capacityIcon from '@/assets/icons/capacity.svg';

export default function EventPage() {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeatMap, setHasSeatMap] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/shows/events/${id}`);
        const data = response.data.data;
        setEventData(data);
        if (data.eventSeatMap) {
          setHasSeatMap(true);
        }
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
  }, [eventData]);

  return (
    <section className="w-screen flex-1 bg-gray-100 flex flex-col custom-selection relative">
      {isLoading ? (
        <Loading
          className="absolute top-6/12 left-6/12"
          size="md"
          color="bg-black"
        />
      ) : !eventData ? (
        <div className="flex items-center justify-center text-white">
          <p className="text-2xl font-semibold text-coral-red custom-selection">
            Content Not Found!
          </p>
        </div>
      ) : (
        <>
          {hasSeatMap && <SeatInspectionPage data={eventData.eventSeatMap} />}
        </>
      )}
    </section>
  );
}
