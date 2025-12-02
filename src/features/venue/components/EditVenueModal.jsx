// REACT HOOKS
import { useState } from 'react';

// CUSTOM HOOKS
import useSnackbar from '@/hooks/useSnackbar';

// COMPONENTS
import Button from '@/components/ui/Button';
import Snackbar from '@/components/common/Snackbar';

// API
import api from '@/lib/axiosClient';

// LOGO & ICONS
import venueIcon from '@/assets/icons/venue.svg';
import addressIcon from '@/assets/icons/address.svg';
import locationIcon from '@/assets/icons/location.svg';

export default function EditVenueModal({ venue, onClose, onUpdated }) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: venue.name,
    address: venue.address,
    city: venue.city,
    country: venue.country,
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

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);

    const emptyFields = Object.values(form).some((v) => !v.trim());

    if (emptyFields) {
      showSnackbar('Please fill in all fields before saving.', 'error');
      setLoading(false);
      return;
    }

    const noChanges =
      form.name === venue.name &&
      form.address === venue.address &&
      form.city === venue.city &&
      form.country === venue.country;

    if (noChanges) {
      showSnackbar(
        'No changes detected. Please modify at least one field before saving.',
        'warning'
      );
      setLoading(false);
      return;
    }

    try {
      const response = await api.patch(`/venues/${venue._id}`, form);
      setTimeout(() => {
        showSnackbar('Venue updated successfully.', 'success');

        setTimeout(() => {
          onUpdated(response.data.data);
          onClose();
          setLoading(false);
        }, 500);
      }, 1000);
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
            <h2 className="text-xl font-semibold text-gray-800">Edit Venue</h2>
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
              placeholder={venue.name}
            />

            <Field
              icon={addressIcon}
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder={venue.address}
            />

            <Field
              icon={locationIcon}
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder={venue.city}
            />

            <Field
              icon={locationIcon}
              label="Country"
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder={venue.country}
            />
          </div>

          <div className="flex justify-end mt-6 gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition cursor-pointer"
            >
              Cancel
            </button>

            <Button
              onClick={handleSubmit}
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

function Field({ icon, label, placeholder, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="flex items-center gap-3 bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-sky-blue">
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
