// REACT HOOKS
import { useState } from 'react';

// CUSTOM HOOKS
import useSnackbar from '@/hooks/useSnackbar';

// COMPONENTS
import Button from '@/components/ui/Button';
import Snackbar from '@/components/common/Snackbar';
import Search from '@/components/common/Search';

// API
import api from '@/lib/axiosClient';

export default function AddEventModal({ onClose, onAdded }) {
  const [shows, setShows] = useState([]);
  const [venues, setVenues] = useState([]);

  const {
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    showSnackbar,
    closeSnackbar,
  } = useSnackbar();

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 animate-[fadeIn_.2s_ease]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Add Event</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition cursor-pointer"
            >
              ✕
            </button>
          </div>
          <div className="w-full h-12 bg-yellow-200">
            <Search
              endpoint={`/shows`}
              onSuggestionsChange={setShows}
              placeholder="Search shows..."
            />
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
