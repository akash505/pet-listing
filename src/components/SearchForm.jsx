// src/components/SearchForm.jsx
import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [animal, setAnimal] = useState('');
  const [location, setLocation] = useState('');
  const [breed, setBreed] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ animal, location, breed });
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <div className="flex flex-wrap items-end gap-4 mb-2">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-blue-300">Animal</label>
          <input
            type="text"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-blue-300">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-blue-300">Breed</label>
          <input
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <button type="submit" className="bg-blue-950 text-white px-4 py-2 rounded mt-2 sm:mt-0">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
