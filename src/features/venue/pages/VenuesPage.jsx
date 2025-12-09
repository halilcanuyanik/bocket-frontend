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
    <section className="flex-1 min-h-screen bg-gray-100 flex flex-col p-6">
      <div className="w-full h-24 flex flex-col gap-4 justify-between">
        <h1 className="text-black font-bold text-4xl">Venues</h1>
        <div className="flex items-center gap-4">
          <Search
            endpoint={`/venues`}
            onSuggestionsChange={setVenues}
            placeholder="Venue name, address, city or country..."
          />
          <button
            className="px-3 py-1.5 font-semibold text-sm text-white bg-black border border-gray-400 rounded-xl shadow-xl hover:bg-black/80  transition cursor-pointer"
            onClick={() => setAddModalOpen(true)}
          >
            Add Venue
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
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
