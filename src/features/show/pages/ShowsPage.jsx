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
              <div className="absolute inset-0 flex flex-col justify-between p-4 z-2">
                <div>
                  <span className="font-bold text-white text-sm block">
                    {s.title}
                  </span>

                  <span
                    className="
          font-semibold text-white text-sm block line-clamp-2 mt-1
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100
        "
                  >
                    {s.description}
                  </span>
                </div>

                <div className="flex items-center overflow-hidden relative">
                  {s.performers.slice(0, 3).map((p, index) => (
                    <img
                      key={p.id}
                      src={p.avatarImage}
                      className={`
        w-12 h-12 object-cover rounded-full border-2 border-white
        ${index !== 0 ? '-ml-4' : ''} shadow-md
      `}
                    />
                  ))}

                  {s.performers.length > 3 && (
                    <div className="-ml-4 w-12 h-12 bg-black text-white text-xs flex items-center justify-center rounded-full border-2 border-white flex-shrink-0">
                      +{s.performers.length - 3}
                    </div>
                  )}

                  <div
                    className="
      absolute bottom-2 right-2 flex gap-2 opacity-0 pointer-events-none
      transition-opacity duration-300
      group-hover:opacity-100 group-hover:pointer-events-auto
    "
                  >
                    <button className="px-2 py-1 text-xs bg-blue-700 text-white border-gray-400 rounded hover:bg-blue-800 shadow-md cursor-pointer">
                      Edit
                    </button>
                    <button className="px-2 py-1 text-xs bg-red-700 text-white border-gray-400 rounded hover:bg-red-800 shadow-md cursor-pointer">
                      Delete
                    </button>
                  </div>
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
