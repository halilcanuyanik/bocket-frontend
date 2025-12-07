// REACT HOOKS
import { useState } from 'react';

// COMPONENTS
import Search from '@/components/common/Search';
import Grid from '@/features/venue/components/Grid';
import AddVenueModal from '../components/AddVenueModal';

function VenuesPage() {
  const [venues, setVenues] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <section className="w-screen flex-1 bg-gray-100 flex flex-col p-6">
      <div className="w-full h-24 flex justify-between items-center px-4">
        <h1 className="text-black font-bold text-4xl">Venues</h1>
        <Search
          endpoint={`/venues`}
          onSuggestionsChange={setVenues}
          placeholder="Venue name, address, city or country..."
        />
        <button
          onClick={() => setAddModalOpen(true)}
          className="bg-black text-white hover:bg-black/80 px-4 py-2 rounded-md cursor-pointer"
        >
          Add Venue
        </button>
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

      {addModalOpen && (
        <AddVenueModal
          onClose={() => setAddModalOpen(false)}
          onAdded={(newVenue) => setVenues([...venues, newVenue])}
        />
      )}
    </section>
  );
}

export default VenuesPage;
