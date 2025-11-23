import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '@/lib/axiosClient';

import Grid from '@/components/ui/Grid';

function VenuesPage() {
  const [venues, setVenues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getVenues = async () => {
      try {
        const response = await api.get('/venues');
        setVenues(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    getVenues();
  }, []);

  return (
    <section className="w-screen flex-1 bg-gray-100 flex gap-4 p-6">
      {venues.map((v) => {
        return (
          <Grid
            key={v._id}
            id={v._id}
            name={v.name}
            address={v.address}
            city={v.city}
            country={v.country}
            capacity={v.capacity}
          />
        );
      })}
    </section>
  );
}

export default VenuesPage;
