import { useState } from "react";

import { searchIcon } from "./../src/assets/data/icons";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", query);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex justify-start mt-10 py-2 gap-x-8 font-sans w-1/3">
      <div className="relative w-full">
        <img
          src={searchIcon}
          className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 w-5 h-5"
        />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search"
          className="w-full py-3 pl-10 text-sm  border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default SearchBar;
