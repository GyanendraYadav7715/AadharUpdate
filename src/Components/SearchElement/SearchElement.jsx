import React, { useState } from "react";

const SearchElement = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    // Call the onSearch callback with the updated search term
    onSearch(event.target.value);
  };
    

  return (
    <form className="max-w-md">
      <label htmlFor="default-search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          placeholder="Search Mockups, Logos..."
          value={searchTerm}
          onChange={handleChange}
          required
        />
        <svg
          className="absolute inset-y-0 left-0 top-1 w-4 h-4 mt-3 ml-3 text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 19l-4-4m0-7a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
          />
        </svg>
      </div>
    </form>
  );
};

export default SearchElement;
