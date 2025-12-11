// REACT HOOKS
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// COMPONENTS
import Search from '@/components/common/Search';
import AddVenueModal from '../components/AddVenueModal';

// ICONS
import venueIcon from '@/assets/icons/venue.svg';
import addressIcon from '@/assets/icons/address.svg';
import locationIcon from '@/assets/icons/location.svg';
import capacityIcon from '@/assets/icons/capacity.svg';

export default function VenuesPage() {
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
            className="px-3 py-1.5 font-semibold text-sm text-white bg-black border border-gray-400 rounded-xl shadow-xl hover:bg-black/80 transition cursor-pointer"
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

function Grid({ id, name, address, city, country, capacity }) {
  const navigate = useNavigate();

  const features = [
    { icon: venueIcon, label: name },
    { icon: addressIcon, label: address },
    { icon: locationIcon, label: `${city}, ${country}` },
    { icon: capacityIcon, label: capacity },
  ];

  return (
    <div
      tabIndex={0}
      className="
        h-48 w-48 p-3 bg-white rounded-lg shadow-sm 
        flex flex-col justify-between text-xs
        relative group outline-none
      "
    >
      <div className="flex flex-col gap-2">
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-2">
            <img src={f.icon} className="w-4 h-4" />
            <span className="truncate">{f.label}</span>
          </div>
        ))}
      </div>

      <button
        className="
          absolute bottom-2 right-2 px-3 py-1 rounded-md 
          text-white bg-black text-[10px]
          opacity-0 group-hover:opacity-100 group-focus:opacity-100
          transition-opacity cursor-pointer
        "
        onClick={() => navigate(`/admin/venues/${id}`)}
      >
        Inspect
      </button>
    </div>
  );
}
