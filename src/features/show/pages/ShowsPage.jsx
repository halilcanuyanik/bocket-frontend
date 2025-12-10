// REACT HOOKS
import { useState, useEffect } from 'react';

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

      <div className="mt-8 w-full flex-1 flex flex-wrap space-x-4 space-y-4">
        {shows.map((s) => {
          return (
            <div className="group w-64 h-72 rounded-sm shadow-md overflow-hidden relative cursor-pointer border border-gray-400">
              <div className="absolute w-full h-full transition duration-300">
                <div className="absolute w-full h-full bg-gradient-to-b from-black/60 via-transparent to-black/60 z-1"></div>
                <img
                  src={s.coverImage}
                  className="absolute w-full h-full object-cover transition-all duration-300 group-hover:blur-sm"
                />
              </div>

              <div className="absolute inset-0 flex flex-col justify-between p-4 z-3">
                <div>
                  <span className="font-bold text-white text-sm block">
                    {s.title}
                  </span>

                  <span
                    className="
          font-semibold text-white text-sm block line-clamp-2 mt-1
          opacity-0
          transition-opacity duration-300
          group-hover:opacity-100
        "
                  >
                    {s.description}
                  </span>
                </div>

                <div className="flex gap-2 overflow-hidden">
                  {s.performers.map((p) => (
                    <img
                      key={p.id}
                      src={p.avatarImage}
                      className="w-12 h-12 shadow-md bg-sky-blue p-[2px] object-cover rounded-full"
                    />
                  ))}

                  {s.performers.length > 3 && (
                    <div className="w-12 h-12 bg-gray-700 text-white text-xs flex items-center justify-center rounded-full flex-shrink-0">
                      +{s.performers.length - 3}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
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
