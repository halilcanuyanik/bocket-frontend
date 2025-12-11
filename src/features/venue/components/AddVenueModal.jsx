// REACT HOOKS
import { useState } from 'react';

// CUSTOM HOOKS
import useSnackbar from '@/hooks/useSnackbar';

// COMPONENTS
import Loading from '@/components/common/Loading';
import Snackbar from '@/components/common/Snackbar';

// API
import api from '@/lib/axiosClient';

// ICONS
import venueIcon from '@/assets/icons/venue.svg';
import addressIcon from '@/assets/icons/address.svg';
import locationIcon from '@/assets/icons/location.svg';

export default function AddVenueModal({ onClose, onAdded }) {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    country: '',
  });

  const {
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    showSnackbar,
    closeSnackbar,
  } = useSnackbar();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const emptyFields = Object.values(form).some((v) => !v.trim());

    if (emptyFields) {
      showSnackbar('Please fill in all fields before saving.', 'error');
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post('/venues', form);
      setTimeout(() => {
        showSnackbar('Venue added successfully.', 'success');

        setTimeout(() => {
          onAdded(response.data.data);
          onClose();
          setIsLoading(false);
        }, 500);
      }, 1000);
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
            <h2 className="text-xl font-semibold text-gray-800">Add Venue</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <Field
              icon={venueIcon}
              label="Venue Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Venue Name"
            />

            <Field
              icon={addressIcon}
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
            />

            <Field
              icon={locationIcon}
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
            />

            <Field
              icon={locationIcon}
              label="Country"
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Country"
            />
          </div>

          <div className="flex justify-end mt-6 gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleAdd}
              disabled={isLoading}
              className="px-4 py-2 bg-green-700 text-white hover:bg-green-800 rounded-lg transition cursor-pointer"
            >
              {isLoading ? <Loading size="sm" color="bg-white" /> : 'Add'}
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

function Field({ icon, label, placeholder, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="px-3 py-2 bg-gray-100 rounded-lg border border-gray-200 outline-none focus-within:ring-1 focus-within:ring-gray-400 flex items-center gap-3">
        <img src={icon} alt="" className="w-5 opacity-60" />
        <input
          {...props}
          placeholder={placeholder}
          className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-400"
        />
      </div>
    </div>
  );
}
