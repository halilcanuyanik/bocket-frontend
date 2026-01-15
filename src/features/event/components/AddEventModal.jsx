import { useState } from 'react';
import useSnackbar from '@/hooks/useSnackbar';
import Loading from '@/components/common/Loading';
import Snackbar from '@/components/common/Snackbar';
import Search from '@/components/common/Search';
import api from '@/lib/axiosClient';
import { currencySymbolMap } from '@/utils/currencyUtils';

export default function AddEventModal({ onClose, onAdded }) {
  const [isLoading, setIsLoading] = useState(false);

  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [basePrice, setBasePrice] = useState('');

  const [currentShows, setCurrentShows] = useState([]);
  const [currentVenues, setCurrentVenues] = useState([]);

  const [isShowFocused, setIsShowFocused] = useState(false);
  const [isVenueFocused, setIsVenueFocused] = useState(false);

  const {
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    showSnackbar,
    closeSnackbar,
  } = useSnackbar();

  const handleSubmit = async () => {
    if (isLoading) return;
    if (!selectedShow) {
      showSnackbar('Show is required.', 'warning');
      return;
    }
    if (!selectedVenue) {
      showSnackbar('Venue is required.', 'warning');
      return;
    }
    setIsLoading(true);

    try {
      const response = await api.post('/shows/events', {
        showId: selectedShow._id,
        venueId: selectedVenue._id,
        startTime,
        pricing: {
          currency,
          base: parseFloat(basePrice),
        },
      });

      setTimeout(() => {
        showSnackbar('Event added successfully!', 'success');
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
            <h2 className="text-xl font-semibold text-gray-800">Add Event</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 relative">
              <label className="text-sm font-medium text-gray-700">Show</label>
              <div
                className="relative"
                onFocus={() => setIsShowFocused(true)}
                onBlur={() => setTimeout(() => setIsShowFocused(false), 150)}
              >
                <Search
                  endpoint="/shows"
                  onSuggestionsChange={setCurrentShows}
                  onSelect={setSelectedShow}
                  placeholder="Search shows..."
                />

                {isShowFocused && currentShows.length > 0 && (
                  <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-auto">
                    {currentShows.map((s) => (
                      <div
                        key={s._id}
                        onClick={() => setSelectedShow(s)}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {s.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {selectedShow && (
                <div className="mt-2 px-3 py-1 rounded">
                  {selectedShow.title} • #1 : {selectedShow.performers[0].name}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1 relative">
              <label className="text-sm font-medium text-gray-700">Venue</label>
              <div
                className="relative"
                onFocus={() => setIsVenueFocused(true)}
                onBlur={() => setTimeout(() => setIsVenueFocused(false), 150)}
              >
                <Search
                  endpoint="/venues"
                  onSuggestionsChange={setCurrentVenues}
                  onSelect={setSelectedVenue}
                  placeholder="Search venues..."
                />

                {isVenueFocused && currentVenues.length > 0 && (
                  <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-auto">
                    {currentVenues.map((v) => (
                      <div
                        key={v._id}
                        onClick={() => setSelectedVenue(v)}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {v.name} • {v.city}, {v.country}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {selectedVenue && (
                <div className="mt-2 px-3 py-1 rounded">
                  {selectedVenue.name} • {selectedVenue.city},{' '}
                  {selectedVenue.country}
                </div>
              )}
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
              className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-4 py-2 text-green-700 bg-green-700/30 hover:bg-green-700/40 rounded-lg transition cursor-pointer"
            >
              {isLoading ? (
                <Loading size="sm" color="bg-green-700" />
              ) : (
                'Create'
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
