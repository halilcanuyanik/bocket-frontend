// REACT HOOKS
import { useState } from 'react';

// CUSTOM HOOKS
import useSnackbar from '@/hooks/useSnackbar';

// COMPONENTS
import Button from '@/components/ui/Button';
import Snackbar from '@/components/common/Snackbar';

// API
import api from '@/lib/axiosClient';

export default function EditPerformerModal({ performer, onClose, onUpdated }) {
  const [name, setName] = useState(performer.name || '');
  const [avatar, setAvatar] = useState(performer.avatarImage || '');
  const [loading, setLoading] = useState(false);

  const {
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    showSnackbar,
    closeSnackbar,
  } = useSnackbar();

  const handleSave = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const { data } = await api.patch(`/performers/${performer._id}`, {
        name,
        avatarImage: avatar,
      });

      showSnackbar('Performer updated successfully.', 'success');

      setTimeout(() => {
        onUpdated(data);
        onClose();
      }, 500);
    } catch (err) {
      console.error(err);
      showSnackbar('An unexpected error occurred.', 'error');
    } finally {
      setLoading(false);
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
            <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
              <div>
                <p className="text-blue-700 font-medium">
                  Editing "{performer.name}"
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Performer Name
              </label>
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
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="https://example.com/avatar.jpg"
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
              onClick={handleSave}
              loading={loading}
              disabled={loading}
              className="px-4 py-2"
            >
              Save
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
