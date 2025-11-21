import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '@/lib/axiosClient';

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
    <div className="w-screen h-screen">
      <ul>
        {venues.map((e) => {
          return (
            <li key={e._id} onClick={() => navigate(`/venues/${e._id}`)}>
              {e.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default VenuesPage;
