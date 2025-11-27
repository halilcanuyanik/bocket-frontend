import { useState } from 'react';
import Search from '@/components/common/Search';
import Grid from '@/components/ui/Grid';

function VenuesPage() {
  const [venues, setVenues] = useState([]);

  return (
    <section className="w-screen flex-1 bg-gray-100 flex flex-col items-center gap-6 p-6">
      <Search
        endpoint={`/venues`}
        onSuggestionsChange={setVenues}
        placeholder="Venue name, address, city or country..."
      />
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
