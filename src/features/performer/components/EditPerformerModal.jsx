// REACT HOOKS
import { useState } from 'react';

// CUSTOM HOOKS
import useSnackbar from '@/hooks/useSnackbar';

// COMPONENTS
import Loading from '@/components/common/Loading';
import Snackbar from '@/components/common/Snackbar';

// API
import api from '@/lib/axiosClient';

export default function EditPerformerModal({ performer, onClose, onUpdated }) {
  const [name, setName] = useState(performer.name || '');
  const [avatar, setAvatar] = useState(performer.avatarImage || '');
  const [isLoading, setIsLoading] = useState(false);

  const {
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    showSnackbar,
    closeSnackbar,
  } = useSnackbar();

  const handleSave = async () => {
    if (isLoading) return;
    setIsLoading(true);

    if (!name.trim() || !avatar.trim()) {
      showSnackbar('Please fill in all fields before saving.', 'error');
      setIsLoading(false);
      return;
    }

    if (name === performer.name && avatar === performer.avatarImage) {
      showSnackbar(
        'No changes detected. Please modify at least one field before saving.',
        'warning'
      );
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await api.patch(`/performers/${performer._id}`, {
        name,
        avatarImage: avatar,
      });

      showSnackbar('Performer updated successfully.', 'success');

      setTimeout(() => {
        onUpdated(data);
        onClose();
        setIsLoading(false);
      }, 500);
    } catch (err) {
      console.error(err);
      showSnackbar('An unexpected error occurred.', 'error');
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 animate-[fadeIn_.2s_ease]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Edit Performer
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
              <label className="text-sm font-medium text-gray-700">
                Performer Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyPress}
                className="px-3 py-2 bg-gray-100 rounded-lg border border-gray-200 outline-none focus-within:ring-1 focus:ring-gray-400"
                placeholder="Enter performer name"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Avatar Image URL
              </label>
              <input
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                onKeyDown={handleKeyPress}
                className="px-3 py-2 bg-gray-100 rounded-lg border border-gray-200 outline-none focus-within:ring-1 focus-within:ring-gray-400"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6 gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 transition rounded-lg cursor-pointer"
            >
              Cancel
            </button>

            <button
              disabled={isLoading}
              onClick={handleSave}
              className="px-4 py-2 text-white bg-blue-700 hover:bg-blue-800 transition rounded-lg cursor-pointer"
            >
              {isLoading ? <Loading size="sm" color="bg-white" /> : 'Save'}
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
