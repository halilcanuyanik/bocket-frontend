import { useState } from 'react';
import Search from '@/components/common/Search';

export default function PerformersPage() {
  const [performers, setPerformers] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ name: '', avatarImage: '' });

  const startEdit = (p) => {
    setEditingId(p._id);
    setDraft({ name: p.name, avatarImage: p.avatarImage });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft({ name: '', avatarImage: '' });
  };

  const saveEdit = async (id) => {
    console.log('saved!');

    setPerformers((prev) =>
      prev.map((p) => (p._id === id ? { ...p, ...draft } : p))
    );

    cancelEdit();
  };

  const deletePerformer = async (id) => {
    console.log('deleted performer:', id);
    setPerformers((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <section className="w-screen flex-1 bg-gray-100 flex flex-col items-center p-6 gap-6">
      <div className="w-full flex justify-center">
        <Search
          endpoint={`/performers`}
          onSuggestionsChange={setPerformers}
          placeholder="Performers..."
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-5xl">
        {performers.map((p) => {
          const isEditing = editingId === p._id;

          return (
            <div
              key={p._id}
              onMouseEnter={() => setHoveredId(p._id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative w-full h-56 rounded-xl overflow-hidden shadow-md bg-gray-200 group"
            >
              {isEditing ? (
                <input
                  value={draft.avatarImage}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, avatarImage: e.target.value }))
                  }
                  className="w-full h-full bg-gray-800 text-white p-2 text-xs"
                  placeholder="Avatar image URL"
                />
              ) : p.avatarImage ? (
                <img
                  src={p.avatarImage}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-300">
                  No Image
                </div>
              )}

              <div className="absolute bottom-0 left-0 w-full bg-black/50 p-2 text-center">
                {isEditing ? (
                  <input
                    value={draft.name}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, name: e.target.value }))
                    }
                    className="w-full bg-transparent border-b border-white text-white text-sm"
                  />
                ) : (
                  <span className="text-white">{p.name}</span>
                )}
              </div>

              {!isEditing && hoveredId === p._id && (
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => startEdit(p)}
                    className="px-2 py-1 text-xs text-white bg-black rounded shadow-md cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePerformer(p._id)}
                    className="px-2 py-1 text-xs text-white bg-black rounded shadow-md cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              )}

              {isEditing && (
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => saveEdit(p._id)}
                    className="px-2 py-1 text-xs bg-green-500 text-white rounded shadow-md cursor-pointer"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-2 py-1 text-xs bg-gray-300 rounded shadow-md cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
