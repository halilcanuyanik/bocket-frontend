import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '@/components/common/Loading';
import api from '@/lib/axiosClient';
import Button from '@/components/ui/Button';

import venueIcon from '@/assets/icons/venue.svg';
import addressIcon from '@/assets/icons/address.svg';
import locationIcon from '@/assets/icons/location.svg';
import capacityIcon from '@/assets/icons/capacity.svg';
import SeatInspectionPage from './SeatInspectionPage';

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
      <section className="w-screen flex-1 bg-gray-100 flex justify-center items-center font-semibold">
        {venue.seatMap ? (
          <SeatInspectionPage data={venue.seatMap} info={venue} />
        ) : (
          <div className="bg-gray-100 flex justify-between px-6 items-center h-16">
            <div className="flex gap-4">
              <span className="flex gap-2">
                <img src={venueIcon} />
                {venue.name}
              </span>
              <span className="flex gap-2">
                <img src={addressIcon} /> {venue.address}
              </span>
              <span className="flex gap-2">
                <img src={locationIcon} /> {venue.city}, {venue.country}
              </span>
              <span className="flex gap-2">
                <img src={capacityIcon} />
                {venue.capacity}
              </span>
            </div>
            <Button size="md" wrapperClass="rounded-lg self-center">
              Edit
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}

export default VenuePage;
