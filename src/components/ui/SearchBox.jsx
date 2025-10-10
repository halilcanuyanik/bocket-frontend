import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBox() {
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
    <div className="relative w-72 sm:w-84 md:w-92">
      <div className="p-[2px] rounded-md bg-gradient-to-r from-electric-blue to-bright-orange">
        <div className="flex items-center gap-2 w-full h-12 px-3 bg-black/80 rounded-md">
          <FaSearch className="text-electric-blue text-lg" />
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Performer, event, venue"
            className="bg-transparent outline-none w-full text-white placeholder-gray-100 font-semibold caret-bright-orange selection:bg-flame-red md:text-xl"
          />
        </div>
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute top-14 left-0 w-full rounded-md z-10 p-[2px] bg-gradient-to-r font-semibold from-deep-blue to-flame-red md:text-xl">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => {
                setQuery(s);
                setSuggestions([]);
              }}
              className={`px-3 py-2 text-white bg-black/60 hover:opacity-90 cursor-pointer ${
                i === 0 ? "rounded-t-md" : ""
              } ${i === suggestions.length - 1 ? "rounded-b-md" : ""}`}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;
