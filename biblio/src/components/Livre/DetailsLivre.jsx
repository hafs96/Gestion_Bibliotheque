// LivreDetail.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './livre.css';

const LivreDetail = () => {
  const { id } = useParams();
  const [livre, setLivre] = useState(null);

  useEffect(() => {
    axios.get(`/api/v1/livre/${id}`)
      .then(response => setLivre(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!livre) return <div>Chargement...</div>;

  return (
    <div className='details'>
      <h1>{livre.titre}</h1>
      <p>{livre.description}</p>
      <p>{livre.auteur}</p>
      <Link to={`/livres/${livre.id}/editer`}>Editer</Link>
    </div>
  );
};

export default LivreDetail;
