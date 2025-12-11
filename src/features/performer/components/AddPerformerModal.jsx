// REACT HOOKS
import { useState } from 'react';

// CUSTOM HOOKS
import useSnackbar from '@/hooks/useSnackbar';

// COMPONENTS<
import Loading from '@/components/common/Loading';
import Snackbar from '@/components/common/Snackbar';

// API
import api from '@/lib/axiosClient';

export default function AddPerformerModal({ onClose, onAdded }) {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [avatarImage, setAvatarImage] = useState('');

  const {
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    showSnackbar,
    closeSnackbar,
  } = useSnackbar();

  const handleSubmit = async () => {
    if (isLoading) return;

    if (!name.trim()) {
      showSnackbar('Name is required.', 'warning');
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post('/performers', {
        name,
        avatarImage,
        averageRating: 0,
        ratingCount: 0,
      });

      setTimeout(() => {
        showSnackbar('Performer added successfully!', 'success');

        setTimeout(() => {
          onAdded(response.data);
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
              Add Performer
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-3 py-2 bg-gray-100 border rounded-lg border-gray-200 outline-none focus-within:ring-1 focus-within:ring-gray-400"
                placeholder="Enter performer name"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Avatar Image URL
              </label>
              <input
                value={avatarImage}
                onChange={(e) => setAvatarImage(e.target.value)}
                className="px-3 py-2 bg-gray-100 border rounded-lg border-gray-200 outline-none focus:ring-1 focus:ring-gray-400"
                placeholder="Enter image URL"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6 gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-4 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800 transition cursor-pointer"
            >
              {isLoading ? <Loading size="sm" color="bg-white" /> : 'Create'}
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
