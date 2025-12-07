// REACT HOOKS
import { useState } from 'react';

// CUSTOM HOOKS
import useSnackbar from '@/hooks/useSnackbar';

// COMPONENTS
import Button from '@/components/ui/Button';
import Snackbar from '@/components/common/Snackbar';

// API
import api from '@/lib/axiosClient';

export default function AddPerformerModal({ onClose, onAdded }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [avatarImage, setAvatarImage] = useState('');

  const {
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    showSnackbar,
    closeSnackbar,
  } = useSnackbar();

  const handleAdd = async () => {
    if (loading) return;

    if (!name.trim()) {
      showSnackbar('Name is required.', 'warning');
      return;
    }

    setLoading(true);

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
          setLoading(false);
        }, 500);
      }, 800);
    } catch (err) {
      console.error(err);
      showSnackbar('An unexpected error occurred.', 'error');
      setLoading(false);
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
                className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
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
                className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
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

            <Button
              onClick={handleAdd}
              loading={loading}
              disabled={loading}
              className="px-4 py-2"
            >
              Add
            </Button>
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
