// REACT HOOKS
import { useState } from 'react';

// COMPONENTS
import Search from '@/components/common/Search';

export default function PerformersPage() {
  const [performers, setPerformers] = useState([]);

  const ranges = [
    { min: 1, max: 2, class: 'text-red-500' },
    { min: 2, max: 3, class: 'text-orange-500' },
    { min: 3, max: 4, class: 'text-yellow-500' },
    { min: 4, max: 5, class: 'text-green-500' },
    { min: 5, max: Infinity, class: 'text-blue-500' },
  ];

  function getColorClass(value) {
    const range = ranges.find((r) => value >= r.min && value < r.max);
    return range ? range.class : 'text-gray-500';
  }

  return (
    <section className="w-screen min-h-screen bg-gray-100 flex flex-col p-6">
      <div className="w-full h-24 flex justify-between items-center px-4">
        <h1 className="text-black font-bold text-4xl">Performers</h1>
        <Search
          endpoint={`/performers`}
          onSuggestionsChange={setPerformers}
          placeholder="Performers..."
        />
      </div>

      <div className="flex flex-wrap gap-8 px-4">
        {performers.map((p) => {
          return (
            <div className="group relative w-72 h-24 bg-white shadow-md rounded-md flex items-center gap-4 overflow-hidden truncate">
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
              </div>
              <button
                className="
          absolute bottom-2 right-2 px-3 py-1 rounded-md 
          text-white bg-black text-[10px]
          opacity-0 group-hover:opacity-100 group-focus:opacity-100
          transition-opacity cursor-pointer
        "
              >
                Edit
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
