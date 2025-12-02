// REACT HOOKS
import { useEffect, useState } from 'react';

// REACT ROUTER HOOKS
import { useParams, useNavigate } from 'react-router-dom';

// COMPONENTS
import Loading from '@/components/common/Loading';
import Button from '@/components/ui/Button';
import VenueInfoBar from '@/features/venue/components/VenueInfoBar';
import EditVenueModal from '@/features/venue/components/EditVenueModal';
import DeleteVenueModal from '@/features/venue/components/DeleteVenueModal';

// PAGES
import SeatInspectionPage from '@/features/venue/pages/SeatInspectionPage';

// API
import api from '@/lib/axiosClient';

function VenuePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [venue, setVenue] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const isModalOpen = isEditOpen || isDeleteOpen;

  useEffect(() => {
    const getVenue = async () => {
      try {
        const response = await api.get(`/venues/${id}`);
        setVenue(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    getVenue();
  }, [id]);

  if (!venue)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loading size="sm" color="bg-black" />
      </div>
    );

  return (
    <section className="w-screen flex-1 bg-gray-100">
      <div className="w-screen flex flex-col">
        <div className="flex items-center">
          <VenueInfoBar venue={venue} />

          <Button
            size="sm"
            wrapperClass="mr-4"
            onClick={() => setIsEditOpen(true)}
          >
            Edit
          </Button>

          <button
            className="text-coral-red bg-coral-red/20 py-1 px-3 rounded-md hover:bg-coral-red/40 cursor-pointer"
            onClick={() => setIsDeleteOpen(true)}
          >
            Delete
          </button>
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

        {venue.seatMap ? (
          <>
            <SeatInspectionPage venue={venue} />
            <div
              className={`${
                isModalOpen ? 'hidden' : ''
              }fixed bottom-6 left-1/2 -translate-x-1/2 z-50`}
            >
              <Button
                size="sm"
                children="Edit Seatmap"
                to={`/admin/venues/edit-seats/${venue._id}`}
              />
            </div>
          </>
        ) : (
          <div className="mt-44 flex flex-col items-center justify-center h-full text-gray-400">
            <p>No seat map defined yet.</p>
            <p className="text-sm">
              Click "Create Seat Map" to start designing.
            </p>
            <Button
              size="sm"
              wrapperClass="mt-4"
              to={`/admin/venues/edit-seats/${venue._id}`}
            >
              Create Seat Map
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default VenuePage;
