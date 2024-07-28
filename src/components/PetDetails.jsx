import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PetDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://pets-v2.dev-apis.com/pets?id=${id}`)
      .then(response => {
        setPet(response.data.pet);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading pet details!</p>;
  if (!pet) return <p>No pet details found.</p>;

  return (
    <div>
      <h2>{pet.name}</h2>
      <p>{pet.description}</p>
    </div>
  );
};

export default PetDetails;
