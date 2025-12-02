// REACT HOOKS
import { useEffect, useState } from 'react';

// REACT ROUTER HOOKS
import { useParams } from 'react-router-dom';

// COMPONENTS
import Loading from '@/components/common/Loading';
import Button from '@/components/ui/Button';
import VenueInfoBar from '@/features/venue/components/VenueInfoBar';
import EditVenueModal from '@/features/venue/components/EditVenueModal';

// PAGES
import SeatInspectionPage from '@/features/venue/pages/SeatInspectionPage';

// API
import api from '@/lib/axiosClient';

function VenuePage() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

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
            children="Edit"
            onClick={() => setIsEditOpen(true)}
          />
        </div>
        {isEditOpen && (
          <EditVenueModal
            venue={venue}
            onClose={() => setIsEditOpen(false)}
            onUpdated={(updatedVenue) => setVenue(updatedVenue)}
          />
        )}
        {venue.seatMap ? (
          <>
            <SeatInspectionPage venue={venue} />
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
              <Button
                size="sm"
                children="Edit Seatmap"
                to={`/admin/edit-venue-seats/${venue._id}`}
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
              children="Create Seat Map"
              wrapperClass="mt-4"
              to={`/admin/edit-venue-seats/${venue._id}`}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default VenuePage;
