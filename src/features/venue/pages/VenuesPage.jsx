// REACT HOOKS
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// COMPONENTS
import Search from '@/components/common/Search';
import AddVenueModal from '@/features/venue/components/AddVenueModal';
import EditVenueModal from '@/features/venue/components/EditVenueModal';
import DeleteVenueModal from '@/features/venue/components/DeleteVenueModal';

// ICONS
import venueIcon from '@/assets/icons/venue.svg';
import addressIcon from '@/assets/icons/address.svg';
import locationIcon from '@/assets/icons/location.svg';
import capacityIcon from '@/assets/icons/capacity.svg';

export default function VenuesPage() {
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <section className="flex-1 min-h-screen bg-gray-100 flex flex-col p-6">
      <div className="w-full h-24 flex flex-col gap-4 justify-between">
        <h1 className="text-black font-bold text-4xl">Venues</h1>
        <Search
          endpoint="/venues"
          onSuggestionsChange={setVenues}
          placeholder="Venue name, address, city or country..."
        />
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <div
          onClick={() => setIsAddModalOpen(true)}
          className="
            h-48 w-48 bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded-lg shadow-md 
            flex flex-col justify-center items-center gap-2 text-gray-400 transition cursor-pointer
          "
        >
          <span className="font-bold text-2xl">+</span>
          <span className="font-semibold text-md">Add Venue</span>
        </div>

        {venues.map((v) => (
          <Grid
            key={v._id}
            venue={v}
            onEdit={(venue) => {
              setSelectedVenue(venue);
              setIsEditModalOpen(true);
            }}
            onDelete={(venue) => {
              setSelectedVenue(venue);
              setIsDeleteModalOpen(true);
            }}
          />
        ))}
      </div>

      {isAddModalOpen && (
        <AddVenueModal
          onClose={() => setIsAddModalOpen(false)}
          onAdded={(newVenue) => setVenues((prev) => [...prev, newVenue])}
        />
      )}

      {isEditModalOpen && selectedVenue && (
        <EditVenueModal
          venue={selectedVenue}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedVenue(null);
          }}
          onUpdated={(updatedVenue) => {
            setVenues((prev) =>
              prev.map((v) => (v._id === updatedVenue._id ? updatedVenue : v))
            );
          }}
        />
      )}

      {isDeleteModalOpen && selectedVenue && (
        <DeleteVenueModal
          venue={selectedVenue}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedVenue(null);
          }}
          onDeleted={(deletedId) => {
            setVenues((prev) => prev.filter((v) => v._id !== deletedId));
          }}
        />
      )}
    </section>
  );
}

function Grid({ venue, onEdit, onDelete }) {
  const navigate = useNavigate();

  const features = [
    { icon: venueIcon, label: venue.name },
    { icon: addressIcon, label: venue.address },
    { icon: locationIcon, label: `${venue.city}, ${venue.country}` },
    { icon: capacityIcon, label: venue.capacity },
  ];

  return (
    <div
      onClick={() => navigate(`/admin/venues/${venue._id}`)}
      className="
        h-48 w-48 p-3 bg-white rounded-lg shadow-sm 
        flex flex-col justify-between text-xs
        relative group cursor-pointer
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

      <div className="flex gap-2 absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(venue);
          }}
          className="px-3 py-1 rounded-md text-white bg-blue-700 hover:bg-blue-800 text-[10px] cursor-pointer"
        >
          Edit
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(venue);
          }}
          className="px-3 py-1 rounded-md text-white bg-red-700 hover:bg-red-800 text-[10px] cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
