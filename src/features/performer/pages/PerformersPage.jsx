// REACT HOOKS
import { useState } from 'react';

// COMPONENTS
import Search from '@/components/common/Search';
import EditPerformerModal from '@/features/performer/components/EditPerformerModal';
import DeletePerformerModal from '@/features/performer/components/DeletePerformerModal';
import AddPerformerModal from '@/features/performer/components/AddPerformerModal';

export default function PerformersPage() {
  const [performers, setPerformers] = useState([]);

  const [selectedPerformer, setSelectedPerformer] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const ranges = [
    { min: 1, max: 2, class: 'text-coral-red' },
    { min: 2, max: 3, class: 'text-lively-orange' },
    { min: 3, max: 4, class: 'text-pastel-gold' },
    { min: 4, max: 5, class: 'text-green-500' },
    { min: 5, max: Infinity, class: 'text-indigo' },
  ];

  function getColorClass(value) {
    const range = ranges.find((r) => value >= r.min && value < r.max);
    return range ? range.class : 'text-gray-500';
  }

  const openEdit = (p) => {
    setSelectedPerformer(p);
    setEditModalOpen(true);
  };

  const openDelete = (p) => {
    setSelectedPerformer(p);
    setDeleteModalOpen(true);
  };

  const handleUpdated = (updatedPerformer) => {
    setPerformers((prev) =>
      prev.map((p) => (p._id === updatedPerformer._id ? updatedPerformer : p))
    );
  };

  const handleDeleted = (id) => {
    setPerformers((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <section className="flex-1 h-screen bg-gray-100 flex flex-col p-6">
      <div className="w-full h-24 flex flex-col gap-4 justify-between">
        <h1 className="text-black font-bold text-4xl">Performers</h1>

        <Search
          endpoint="/performers"
          onSuggestionsChange={setPerformers}
          placeholder="Search performers..."
        />
      </div>

      <div className="mt-8 flex flex-wrap gap-8 ">
        <div
          onClick={() => setAddModalOpen(true)}
          className="group relative w-72 h-24 bg-gray-200 hover:bg-gray-300 border border-gray-300 shadow-md rounded-sm flex flex-col justify-center items-center gap-2 text-gray-400 cursor-pointer"
        >
          <span className="text-2xl font-bold">+</span>
          <span className=" font-semibold text-md">Add Performer</span>
        </div>

        {performers.map((p) => (
          <div
            key={p._id}
            className="group relative w-72 h-24 bg-white shadow-md rounded-sm flex items-center gap-4 overflow-hidden truncate"
          >
            <img src={p.avatarImage} className="h-full object-cover" />

            <div className="h-full mt-8 flex flex-col">
              <span className="text-sm font-semibold">{p.name}</span>
              <span
                className={`text-md font-bold ${getColorClass(
                  p.averageRating
                )}`}
              >
                ⭐ {p.averageRating}
              </span>
              <span className="text-gray-600 text-xs">({p.ratingCount})</span>
            </div>

            <button
              onClick={() => openEdit(p)}
              className="
                absolute bottom-2 right-16 px-3 py-1 rounded-md 
                text-white bg-blue-700 hover:bg-blue-800 text-[10px]
                opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer
              "
            >
              Edit
            </button>

            <button
              onClick={() => openDelete(p)}
              className="
                absolute bottom-2 right-2 px-3 py-1 rounded-md 
                text-white bg-red-700 hover:bg-red-800 text-[10px]
                opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer
              "
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {editModalOpen && selectedPerformer && (
        <EditPerformerModal
          performer={selectedPerformer}
          onClose={() => setEditModalOpen(false)}
          onUpdated={handleUpdated}
        />
      )}

      {deleteModalOpen && selectedPerformer && (
        <DeletePerformerModal
          performer={selectedPerformer}
          onClose={() => setDeleteModalOpen(false)}
          onDeleted={handleDeleted}
        />
      )}

      {addModalOpen && (
        <AddPerformerModal
          onClose={() => setAddModalOpen(false)}
          onAdded={(newPerformer) =>
            setPerformers((prev) => [newPerformer, ...prev])
          }
        />
      )}
    </section>
  );
}
