import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchIcon } from "./../src/assets/data/icons";
import { handleSearchUser, clearSearch } from "../src/app/searchQuery";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const delayDeb = setTimeout(() => {
      if (query.trim()) {
        dispatch(handleSearchUser(query));
      } else {
        dispatch(clearSearch());
      }
    }, 500);

    return () => clearTimeout(delayDeb);
  }, [query, dispatch]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex justify-start mt-10 py-2 gap-x-8 font-sans w-1/3">
      <div className="relative w-full">
        <img
          src={searchIcon}
          alt="Search Icon"
          className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 w-5 h-5"
        />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search"
          className="w-full py-3 pl-10 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default SearchBar;
