import { useState } from 'react';
import useSnackbar from '@/hooks/useSnackbar';
import Loading from '@/components/common/Loading';
import Snackbar from '@/components/common/Snackbar';
import api from '@/lib/axiosClient';

export default function DeleteEventModal({ event, onClose, onDeleted }) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    showSnackbar,
    closeSnackbar,
  } = useSnackbar();

  const handleDelete = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await api.delete(`/shows/events/${event._id}`);

      setTimeout(() => {
        showSnackbar('Event deleted successfully.', 'success');
        setTimeout(() => {
          onDeleted(event._id);
          onClose();
          setIsLoading(false);
        }, 500);
      }, 600);
    } catch (err) {
      console.error(err);
      showSnackbar('Failed to delete event.', 'error');
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 animate-[fadeIn_.2s_ease]">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Delete Event
          </h2>

          <p className="text-sm text-gray-600 mb-4">
            Are you sure you want to delete this event?
          </p>

          <div className="bg-gray-100 rounded-lg p-3 text-sm mb-6">
            <div className="font-semibold">{event.show?.title}</div>
            <div className="text-gray-600">
              {event.venue?.name} • {event.venue?.city}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="px-4 py-2 text-coral-red bg-coral-red/30 hover:bg-coral-red/40 rounded-lg transition cursor-pointer"
            >
              {isLoading ? (
                <Loading size="sm" color="bg-coral-red" />
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </div>
      </div>

      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={closeSnackbar}
      />
    </>
  );
}
