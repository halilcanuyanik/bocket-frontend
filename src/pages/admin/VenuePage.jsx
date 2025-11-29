// REACT HOOKS
import { useEffect, useState } from 'react';

// REACT ROUTER HOOKS
import { useParams } from 'react-router-dom';

// COMPONENTS
import Loading from '@/components/common/Loading';
import VenueInfoBar from '@/components/ui/VenueInfoBar';
import Button from '@/components/ui/Button';

// PAGES
import SeatInspectionPage from '@/pages/admin/SeatInspectionPage';
import SeatEditionPage from '@/pages/admin/SeatEditionPage';

// API
import api from '@/lib/axiosClient';

function VenuePage() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    const getVenue = async () => {
      try {
        const response = await api.get(`/venues/${id}`);
        setVenue(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    getVenue();
  }, [id]);

  if (!venue)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loading size="sm" color="bg-black" />
      </div>
    );

  return (
    <section className="w-screen flex-1 bg-gray-100">
      {venue.seatMap ? (
        <SeatInspectionPage venue={venue} />
      ) : (
        <div className="flex items-center">
          <VenueInfoBar venue={venue} />
          <Button size="sm" children="Edit" />
        </div>
      )}
    </section>
  );
}

export default VenuePage;
