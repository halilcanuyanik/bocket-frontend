// REACT HOOKS
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// COMPONENTS
import VenueInfoBar from '@/components/ui/VenueInfoBar';
import SeatInspectionPage from './SeatInspectionPage';
import Loading from '@/components/common/Loading';

// API
import api from '@/lib/axiosClient';

function VenuePage() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await api.get(`/venues/${id}`);
        console.log(response.data.data);
        setVenue(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVenue();
  }, [id]);

  if (!venue)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loading size="sm" color="bg-black" />
      </div>
    );

  return (
    <div className="w-screen h-screen flex flex-col">
      <section className="w-screen flex-1 bg-gray-100 flex font-semibold">
        {venue.seatMap ? (
          <SeatInspectionPage venue={venue} seatMap={venue.seatMap} />
        ) : (
          <VenueInfoBar venue={venue} />
        )}
      </section>
    </div>
  );
}

export default VenuePage;
