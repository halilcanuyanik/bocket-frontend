import { useState } from 'react';
import useSnackbar from '@/hooks/useSnackbar';
import Loading from '@/components/common/Loading';
import Snackbar from '@/components/common/Snackbar';
import api from '@/lib/axiosClient';
import { currencySymbolMap } from '@/utils/currencyUtils';

export default function EditEventModal({ event, onClose, onUpdated }) {
  const [isLoading, setIsLoading] = useState(false);

  const [startTime, setStartTime] = useState(
    event.startTime ? event.startTime.slice(0, 16) : ''
  );
  const [currency, setCurrency] = useState(event.pricing?.currency || 'USD');
  const [basePrice, setBasePrice] = useState(
    event.pricing?.base?.toString() || ''
  );

  const {
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    showSnackbar,
    closeSnackbar,
  } = useSnackbar();

  const handleSubmit = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await api.put(`/shows/events/${event._id}`, {
        startTime,
        pricing: {
          currency,
          base: parseFloat(basePrice),
        },
      });

      setTimeout(() => {
        showSnackbar('Event updated successfully!', 'success');
        setTimeout(() => {
          onUpdated(response.data);
          onClose();
          setIsLoading(false);
        }, 500);
      }, 600);
    } catch (err) {
      console.error(err);
      showSnackbar('Failed to update event.', 'error');
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 animate-[fadeIn_.2s_ease]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Edit Event</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-sm bg-gray-100 rounded-lg p-3">
              <div className="font-semibold">{event.show?.title}</div>
              <div className="text-gray-600">
                {event.venue?.name} • {event.venue?.city}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Start Time
              </label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="px-3 py-2 bg-gray-100 rounded-lg border border-gray-200 outline-none focus-within:ring-1 focus-within:ring-gray-400"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Base Pricing
              </label>
              <div className="flex gap-2">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="px-2 py-2 bg-gray-100 rounded-lg border border-gray-200 outline-none focus-within:ring-1 focus-within:ring-gray-400"
                >
                  {Object.keys(currencySymbolMap).map((cur) => (
                    <option key={cur} value={cur}>
                      {cur} ({currencySymbolMap[cur]})
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                  className="px-3 py-2 bg-gray-100 rounded-lg border border-gray-200 outline-none focus-within:ring-1 focus-within:ring-gray-400 flex-1"
                  placeholder="0.00"
                />
              </div>
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
              className="px-4 py-2 bg-blue-700 text-white hover:bg-blue-800 rounded-lg transition cursor-pointer"
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
