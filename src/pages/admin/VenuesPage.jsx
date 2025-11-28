// REACT HOOKS
import { useState } from 'react';

// COMPONENTS
import Search from '@/components/common/Search';
import Grid from '@/components/ui/Grid';

function VenuesPage() {
  const [venues, setVenues] = useState([]);

  return (
    <section className="w-screen flex-1 bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full h-24 flex justify-between items-center px-4">
        <h1 className="text-black font-bold text-4xl">Venues</h1>
        <Search
          endpoint={`/venues`}
          onSuggestionsChange={setVenues}
          placeholder="Venue name, address, city or country..."
        />
      </div>

      <div className="flex flex-wrap gap-4">
        {venues.map((v) => (
          <Grid
            key={v._id}
            id={v._id}
            name={v.name}
            address={v.address}
            city={v.city}
            country={v.country}
            capacity={v.capacity}
          />
        ))}
      </div>
    </section>
  );
}

export default VenuesPage;
