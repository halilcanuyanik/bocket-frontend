// REACT HOOKS
import { useState } from 'react';

// COMPONENTS
import Search from '@/components/common/Search';
import AddShowModal from '@/features/show/components/AddShowModal';

function ShowsPage() {
  const [shows, setShows] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <section className="flex-1 min-h-screen bg-gray-100 flex flex-col p-6">
      <div className="w-full h-24 flex flex-col gap-4 justify-between">
        <h1 className="text-black font-bold text-4xl">Shows</h1>
        <div className="flex items-center gap-4">
          <Search
            endpoint={`/shows`}
            onSuggestionsChange={setShows}
            placeholder="Show title, performers..."
          />
          <button
            className="px-3 py-1.5 font-semibold text-sm text-white bg-black border border-gray-400 rounded-xl shadow-xl hover:bg-black/80  transition cursor-pointer"
            onClick={() => setAddModalOpen(true)}
          >
            Add Show
          </button>
        </div>
      </div>

      {addModalOpen && (
        <AddShowModal
          onClose={() => setAddModalOpen(false)}
          onAdded={(newShow) => setShows([...shows, newShow])}
        />
      )}
    </section>
  );
}

export default ShowsPage;
