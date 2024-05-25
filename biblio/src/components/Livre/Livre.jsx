// Livres.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

const Livres = () => {
  const [livres, setLivres] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/livre')
      .then(response => setLivres(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <Header/>
      <h1>Liste des Livres</h1>
      <button className='button-1'><Link to="/livres/nouveau" className='link'>Ajouter un Nouveau Livre</Link></button>
      <ul>
        {livres.map(livre => (
          <li key={livre.id}>
            <Link to={`/livres/${livre.id}`}>{livre.titre}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Livres;
