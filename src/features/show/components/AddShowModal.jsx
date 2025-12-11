// REACT HOOKS
import { useState } from 'react';

// CUSTOM HOOKS
import useSnackbar from '@/hooks/useSnackbar';

// COMPONENTS
import Loading from '@/components/common/Loading';
import Snackbar from '@/components/common/Snackbar';
import Search from '@/components/common/Search';

// APIs
import api from '@/lib/axiosClient';

export default function AddShowModal({ onClose, onAdded }) {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [currentPerformers, setCurrentPerformers] = useState([]);
  const [performers, setPerformers] = useState([]);

  const categories = [
    'concert',
    'theatre',
    'festival',
    'stand up',
    'gala',
    'other',
  ];

  const {
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    showSnackbar,
    closeSnackbar,
  } = useSnackbar();

  const handleAdd = async () => {
    if (isLoading) return;

    if (!title.trim()) {
      showSnackbar('Title is required.', 'warning');
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post('/shows', {
        title,
        description,
        category,
        coverImage,
        performers,
        averageRating: 0,
        ratingCount: 0,
      });

      setTimeout(() => {
        showSnackbar('Show added successfully!', 'success');

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

  const handleSelectPerformer = (p) => {
    if (!performers.some((x) => x._id === p._id)) {
      setPerformers((prev) => [...prev, p]);
    }
  };

  const removePerformer = (id) => {
    setPerformers((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 animate-[fadeIn_.2s_ease]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Add Show</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter show's title"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter show's description"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="">Select...</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Cover Image URL
              </label>
              <input
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter image URL"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Search Performers
              </label>

              <Search
                endpoint={`/performers`}
                onSuggestionsChange={setCurrentPerformers}
                onSelect={handleSelectPerformer}
                placeholder="Performers..."
              />

              <div className="flex flex-wrap gap-2 mt-2">
                {performers.map((p) => (
                  <div
                    key={p._id}
                    className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    {p.name}
                    <button
                      onClick={() => removePerformer(p._id)}
                      className="ml-2 text-red-500 font-bold"
                    >
                      -
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BUTTONS */}
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
