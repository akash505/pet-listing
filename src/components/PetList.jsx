import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchForm from "./SearchForm";

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const petsPerPage = 5; // Number of pets per page

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = (searchParams = {}) => {
    setLoading(true);
    const { animal, location, breed } = searchParams;
    let url = `http://pets-v2.dev-apis.com/pets`;
    const queryParams = [];
    if (animal) queryParams.push(`animal=${animal}`);
    if (location) queryParams.push(`location=${location}`);
    if (breed) queryParams.push(`breed=${breed}`);
    if (queryParams.length > 0) url += `?${queryParams.join('&')}`;

    axios
      .get(url)
      .then((response) => {
        setPets(response.data.pets);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = pets.slice(indexOfFirstPet, indexOfLastPet);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(pets.length / petsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleSearch = (searchParams) => {
    fetchPets(searchParams);
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <div className="container mx-auto p-4 bg-slate-700">
      <SearchForm onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>Error loading pets!</p>}
      {!loading && !error && !pets.length && <p>No pets found.</p>}
      {!loading && !error && pets.length > 0 && (
        <>
          {currentPets.map((pet) => (
            <div key={pet.id} className="border bg-slate-500 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h2 className="text-xl font-bold mb-2">{pet.name}</h2>
                  <p>
                    <strong>Breed:</strong> {pet.breed}
                  </p>
                  <p>
                    <strong>Animal:</strong> {pet.animal}
                  </p>
                  <p>
                    <strong>Location:</strong> {pet.city}, {pet.state}
                  </p>
                  <p>
                    <strong>Description:</strong> {pet.description}
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-wrap">
                  {pet.images.map((image, index) => (
                    <div key={index} className="m-2 border border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`${pet.name} ${index}`}
                        className="w-48 h-48 object-cover cursor-pointer"
                        onClick={() => handleImageClick(image)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center items-center mt-5">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="bg-blue-950 text-white px-4 py-2 rounded mr-2 disabled:opacity-50"
            >
              Previous
            </button>
            <span className=" text-blue-300">{` Page ${currentPage} of ${Math.ceil(pets.length / petsPerPage)}`}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === Math.ceil(pets.length / petsPerPage)}
              className="bg-blue-950 text-white px-4 py-2 rounded ml-2 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg h-auto w-96">
            <img src={selectedImage} alt="Selected Pet" className="max-w-full max-h-full" />
            <button
              onClick={handleCloseModal}
              className="mt-1 bg-red-500 text-white px-1 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetList;
