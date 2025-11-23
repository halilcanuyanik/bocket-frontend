import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '@/lib/axiosClient';

import venueIcon from '@/assets/icons/venue.svg';
import addressIcon from '@/assets/icons/address.svg';
import locationIcon from '@/assets/icons/location.svg';
import capacityIcon from '@/assets/icons/capacity.svg';

function VenuePage() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await api.get(`/venues/${id}`);
        setVenue(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVenue();
  }, [id]);

  if (!venue) return <div>Loading...</div>;

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex justify-between px-6 items-center h-16">
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
        <div className="flex items-center">
          <button className="bg-black text-white font-semibold hover:bg-black/80 cursor-pointer px-6 py-1.5 rounded-md">
            Edit
          </button>
        </div>
      </div>
      <section className="w-screen flex-1 bg-gray-100 flex justify-center items-center text-6xl font-semibold">
        {venue.seatMap ? (
          <div className="flex flex-col gap-12 items-center">
            <p>There is a seat map!</p>
            <button className="bg-black text-white font-semibold text-xl hover:bg-black/80 cursor-pointer px-1 py-1.5 rounded-md w-48">
              Edit Seat Map
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-12 items-center">
            <p>There is no seat map!</p>
            <button className="bg-black text-white font-semibold text-xl hover:bg-black/80 cursor-pointer px-1 py-1.5 rounded-md w-48">
              Add Seat Map
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default VenuePage;
