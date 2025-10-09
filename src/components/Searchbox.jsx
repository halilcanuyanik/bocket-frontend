import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const data = [
    "Performer",
    "Event",
    "Venue",
    "Concert",
    "Festival",
    "Theatre",
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = data.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    }
  };

  return (
    <div className="relative w-64">
      <div className="p-[2px] rounded-md bg-gradient-to-r from-electric-blue to-bright-orange">
        <div className="flex items-center gap-2 w-full h-12 px-3 bg-black/80 rounded-md">
          <FaSearch className="text-gray-100 text-lg" />
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Performer, event, venue"
            className="bg-transparent outline-none w-full text-white placeholder-gray-100 font-semibold"
          />
        </div>
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute top-14 left-0 w-full bg-black/90 border border-gray-700 rounded-md z-10">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => {
                setQuery(s);
                setSuggestions([]);
              }}
              className="px-3 py-2 text-white hover:bg-gray-800 cursor-pointer"
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
