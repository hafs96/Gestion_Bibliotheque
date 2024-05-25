// Emprunts.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './emprunts.css'
import Header from '../Header/Header';
const Emprunts = () => {
  const [emprunts, setEmprunts] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/emprunt')
      .then(response => setEmprunts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <Header/>
      <h1>Liste des Emprunts</h1>
      <button className='button-1'><Link to="/emprunts/nouveau" className='link'>Ajouter un Nouvel Emprunt</Link></button>
      <ul>
        {emprunts.map(emprunt => (
          <li key={emprunt.id}>
            Livre: {emprunt.livre.titre}, Client: {emprunt.client.nom} {emprunt.client.prenom}
            <Link to={`/emprunts/${emprunt.id}/retourner`}>Retourner</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Emprunts;
