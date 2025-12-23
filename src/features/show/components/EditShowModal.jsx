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

export default function EditShowModal({ show, onClose, onUpdated }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [title, setTitle] = useState(show.title || '');
  const [description, setDescription] = useState(show.description || '');
  const [category, setCategory] = useState(show.category || '');
  const [coverImage, setCoverImage] = useState(show.coverImage || '');

  const [currentPerformers, setCurrentPerformers] = useState([]);
  const [performers, setPerformers] = useState(show.performers || []);

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

  const handleUpdate = async () => {
    if (isLoading) return;

    if (!title.trim()) {
      showSnackbar('Title is required.', 'warning');
      return;
    }

    setIsLoading(true);

    try {
      const res = await api.patch(`/shows/${show._id}`, {
        title,
        description,
        category,
        coverImage,
        performers: performers.map((p) => p._id),
      });

      showSnackbar('Show updated successfully!', 'success');

      setTimeout(() => {
        onUpdated(res.data);
        onClose();
        setIsLoading(false);
      }, 500);
    } catch (err) {
      console.error(err);
      showSnackbar('Update failed.', 'error');
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
            <h2 className="text-xl font-semibold text-gray-800">Edit Show</h2>
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
                className="px-3 py-2 bg-gray-100 rounded-lg border border-gray-200 outline-none focus-within:ring-1 focus-within:ring-gray-400"
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
                className="px-3 py-2 bg-gray-100 rounded-lg border border-gray-200 outline-none focus-within:ring-1 focus-within:ring-gray-400"
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
                className="px-3 py-2 bg-gray-100 rounded-lg border border-gray-200 outline-none focus-within:ring-1 focus-within:ring-gray-400"
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
                className="px-3 py-2 bg-gray-100 rounded-lg border border-gray-200 outline-none focus-within:ring-1 focus-within:ring-gray-400"
                placeholder="Enter image URL"
              />
            </div>

            <div className="flex flex-col gap-1 relative">
              <label className="text-sm font-medium text-gray-700">
                Search Performers
              </label>

              <div
                className="relative"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 150)}
              >
                <Search
                  endpoint="/performers"
                  onSuggestionsChange={setCurrentPerformers}
                  onSelect={handleSelectPerformer}
                  placeholder="Performers..."
                />

                {isFocused && currentPerformers.length > 0 && (
                  <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-auto">
                    {currentPerformers.map((p) => (
                      <div
                        key={p._id}
                        onClick={() => handleSelectPerformer(p)}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {p.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {performers.map((p) => (
                  <div
                    key={p._id}
                    className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    <span className="mr-2">{p.name}</span>
                    <button
                      onClick={() => removePerformer(p._id)}
                      className="text-red-700 font-bold hover:text-red-800 cursor-pointer"
                    >
                      &times;
                    </button>
                  </div>
                ))}
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
              onClick={handleUpdate}
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
