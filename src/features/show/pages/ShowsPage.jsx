// REACT HOOKS
import { useState } from 'react';

// COMPONENTS
import Search from '@/components/common/Search';
import AddShowModal from '@/features/show/components/AddShowModal';
import EditShowModal from '@/features/show/components/EditShowModal';
import DeleteShowModal from '@/features/show/components/DeleteShowModal';

function ShowsPage() {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <section className="flex-1 min-h-screen bg-gray-100 flex flex-col p-6">
      <div className="w-full h-24 flex flex-col gap-4 justify-between">
        <h1 className="text-black font-bold text-4xl">Shows</h1>
        <Search
          endpoint={`/shows`}
          onSuggestionsChange={setShows}
          placeholder="Shows..."
        />
      </div>

      <div className="mt-8 w-full flex-1 flex flex-wrap space-x-4 space-y-4">
        <div
          onClick={() => setIsAddModalOpen(true)}
          className="
      group w-64 h-72 rounded-sm shadow-md overflow-hidden relative cursor-pointer 
      border border-gray-300 bg-gray-200 flex flex-col items-center justify-center
      hover:bg-gray-300 transition
    "
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl font-bold text-gray-400">+</span>
            <span className="text-gray-400 font-semibold text-lg">
              Add Show
            </span>
          </div>
        </div>

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
                    <button
                      onClick={() => {
                        setSelectedShow(s);
                        setIsEditModalOpen(true);
                      }}
                      className="px-2 py-1 text-xs bg-blue-700 text-white border-gray-400 rounded hover:bg-blue-800 shadow-md cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedShow(s);
                        setIsDeleteModalOpen(true);
                      }}
                      className="px-2 py-1 text-xs bg-red-700 text-white border-gray-400 rounded hover:bg-red-800 shadow-md cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isAddModalOpen && (
        <AddShowModal
          onClose={() => setIsAddModalOpen(false)}
          onAdded={(newShow) => setShows((prev) => [...prev, newShow])}
        />
      )}

      {isEditModalOpen && selectedShow && (
        <EditShowModal
          show={selectedShow}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedShow(null);
          }}
          onUpdated={(updatedShow) =>
            setShows((prev) =>
              prev.map((s) => (s._id === updatedShow._id ? updatedShow : s))
            )
          }
        />
      )}

      {isDeleteModalOpen && selectedShow && (
        <DeleteShowModal
          show={selectedShow}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedShow(null);
          }}
          onDeleted={(deletedId) =>
            setShows((prev) => prev.filter((s) => s._id !== deletedId))
          }
        />
      )}
    </section>
  );
}

export default ShowsPage;
