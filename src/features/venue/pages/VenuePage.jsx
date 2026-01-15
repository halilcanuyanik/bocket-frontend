// REACT HOOKS
import { useEffect, useState } from 'react';

// REACT ROUTER HOOKS
import { useParams, useNavigate } from 'react-router-dom';

// COMPONENTS
import Loading from '@/components/common/Loading';
import Button from '@/components/ui/Button';
import VenueInfoBar from '@/features/venue/components/VenueInfoBar';
import ZoomControl from '@/components/ui/ZoomControl';
import EditVenueModal from '@/features/venue/components/EditVenueModal';
import DeleteVenueModal from '@/features/venue/components/DeleteVenueModal';
import SeatInspection from '@/features/venue/pages/SeatInspection';

// ICONS
import venueIcon from '@/assets/icons/venue.svg';
import addressIcon from '@/assets/icons/address.svg';
import locationIcon from '@/assets/icons/location.svg';

// API
import api from '@/lib/axiosClient';

export default function VenuePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await api.get(`/venues/${id}`);
        setVenue(response.data.data);

        const initialScale = response.data.data?.seatMap?.meta?.scale || 1;
        setScale(initialScale);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  const handleZoom = (delta) => {
    setScale((prev) => Math.max(0.2, Math.min(3, prev + delta)));
  };

  if (isLoading)
    return (
      <div className="flex-1 h-screen bg-gray-100 flex justify-center items-center">
        <Loading size="sm" color="bg-black" />
      </div>
    );

  return (
    <section className="flex flex-1 min-h-screen bg-gray-100">
      {!venue.seatMap ? (
        <div className="relative flex-1 flex flex-col pr-48">
          <div className="w-full h-full flex flex-col items-center justify-center gap-1">
            <span className="text-sm text-gray-400">
              No seatmap defined yet!
            </span>
            <span className="text-md text-gray-600">
              Click "Create Seat Map" to define any.
            </span>
            <button className="px-2 py-2 text-xs text-white bg-black hover:bg-black/80 border border-black rounded-md transition cursor-pointer">
              Create Seat Map
            </button>
          </div>
        </div>
      ) : (
        <div className="relative flex-1 flex flex-col pr-48">
          <ZoomControl
            wrapperClass="absolute top-4 left-4 z-1"
            scale={scale}
            onZoom={handleZoom}
          />
          <SeatInspection venue={venue} scale={scale} />
        </div>
      )}

      <div className="fixed right-0 top-0 w-48 h-screen bg-gray-300 grid grid-rows-3">
        <div className="w-full h-full p-2 flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <img src={venueIcon} className="w-6 h-6" />
            <span className="text-xs">{venue.name}</span>
          </div>

          <div className="flex gap-2 items-center">
            <img src={addressIcon} className="w-6 h-6" />
            <span className="text-xs">{venue.address}</span>
          </div>

          <div className="flex gap-2 items-center">
            <img src={locationIcon} className="w-6 h-6" />
            <span className="text-xs">
              {venue.city}, {venue.country}
            </span>
          </div>

          <button
            className="py-2 text-xs text-royal-blue bg-royal-blue/30 hover:bg-royal-blue/40 border border-royal-blue rounded-sm transition cursor-pointer"
            onClick={() => setIsEditOpen(true)}
          >
            Edit
          </button>
          <button
            className="py-2 text-xs text-coral-red bg-coral-red/30 hover:bg-coral-red/40 border border-coral-red rounded-sm transition cursor-pointer"
            onClick={() => setIsDeleteOpen(true)}
          >
            Delete
          </button>
          {venue.seatMap && (
            <button
              className="py-2 text-xs text-white bg-black hover:bg-black/80 border border-black rounded-sm transition cursor-pointer"
              onClick={() => navigate(`/admin/venues/edit-seats/${venue._id}`)}
            >
              Edit Seat Map
            </button>
          )}
        </div>
      </div>
      {isEditOpen && (
        <EditVenueModal
          venue={venue}
          onClose={() => setIsEditOpen(false)}
          onUpdated={(updatedVenue) => setVenue(updatedVenue)}
        />
      )}
      {isDeleteOpen && (
        <DeleteVenueModal
          venue={venue}
          onClose={() => setIsDeleteOpen(false)}
          onDeleted={() => {
            navigate('/admin/venues');
          }}
        />
      )}
    </section>
  );
}
