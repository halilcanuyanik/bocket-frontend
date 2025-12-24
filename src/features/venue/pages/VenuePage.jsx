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

// PAGES
import SeatInspectionPage from '@/features/venue/pages/SeatInspectionPage';

// API
import api from '@/lib/axiosClient';

function VenuePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const isModalOpen = isEditOpen || isDeleteOpen;

  useEffect(() => {
    const getVenue = async () => {
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

    getVenue();
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
    <section className="flex-1 min-h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-4">
          <VenueInfoBar venue={venue} />
          {venue.seatMap && (
            <>
              <ZoomControl scale={scale} onZoom={handleZoom} />
              <button
                className="px-3 py-2 text-white rounded-lg text-sm bg-blue-700 hover:bg-blue-800 transition cursor-pointer"
                onClick={() => setIsEditOpen(true)}
              >
                Edit
              </button>
              <button
                className="px-3 py-2 text-white rounded-lg text-sm bg-red-700 hover:bg-red-800 transition cursor-pointer"
                onClick={() => setIsDeleteOpen(true)}
              >
                Delete
              </button>
            </>
          )}
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
            <SeatInspectionPage venue={venue} scale={scale} />
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
