import React, { useState } from 'react';
import PetList from '../components/PetList';
// import SearchForm from '../components/SearchForm';

const Home = () => {
  // const [pets, setPets] = useState([]);

  return (
    <div>
      {/* <SearchForm setPets={setPets} /> */}
      <PetList  />
    </div>
  );
};

export default Home;
