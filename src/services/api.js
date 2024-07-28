import axios from 'axios';

const API_URL = 'https://pets-v2.dev-apis.com';

export const fetchPets = async () => {
  try {
    const response = await axios.get(`${API_URL}/pets`);
    return response.data.pets;
  } catch (error) {
    throw error;
  }
};

export const fetchPetById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/pets?id=${id}`);
    return response.data.pet;
  } catch (error) {
    throw error;
  }
};

export const fetchBreedsByAnimal = async (animal) => {
  try {
    const response = await axios.get(`${API_URL}/breeds?animal=${animal}`);
    return response.data.breeds;
  } catch (error) {
    throw error;
  }
};

export const searchPets = async (animal, location, breed) => {
  try {
    const response = await axios.get(`${API_URL}/pets?animal=${animal}&location=${location}&breed=${breed}`);
    return response.data.pets;
  } catch (error) {
    throw error;
  }
};
