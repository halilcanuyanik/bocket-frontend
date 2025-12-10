// REACT HOOKS
import { useState } from 'react';

// CUSTOM HOOKS
import useSnackbar from '@/hooks/useSnackbar';

// COMPONENTS
import Loading from '@/components/common/Loading';
import Snackbar from '@/components/common/Snackbar';

// API
import api from '@/lib/axiosClient';

export default function DeletePerformerModal({
  performer,
  onClose,
  onDeleted,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmation, setConfirmation] = useState('');

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

    if (confirmation !== 'DELETE') {
      showSnackbar('Please type DELETE to confirm.', 'warning');
      setIsLoading(false);
      return;
    }

    try {
      await api.delete(`/performers/${performer._id}`);

      setTimeout(() => {
        showSnackbar('Performer deleted successfully.', 'success');

        setTimeout(() => {
          onDeleted(performer._id);
          onClose();
          setIsLoading(false);
        }, 500);
      }, 800);
    } catch (err) {
      console.error(err);
      showSnackbar('An unexpected error occurred.', 'error');
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 animate-[fadeIn_.2s_ease]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Delete Performer
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              <div>
                <p className="text-red-700 font-medium">
                  Are you sure you want to delete "{performer.name}"?
                </p>
                <p className="text-red-500 text-sm">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Type <span className="text-red-600 font-semibold">DELETE</span>{' '}
                to confirm
              </label>

              <input
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-400"
                placeholder="DELETE"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6 gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2  bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg  cursor-pointertransition "
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="px-4 py-2"
            >
              {isLoading ? <Loading size="sm" color="bg-white" /> : 'Delete'}
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
