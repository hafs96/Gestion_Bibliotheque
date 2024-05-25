// NouveauLivre.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import './livre.css';
const NouveauLivre = () => {
  const [livre, setLivre] = useState({ titre: '', description: '', auteur: '' });
  const history = useNavigate();

  const handleChange = e => {
    setLivre({ ...livre, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/api/v1/livre', livre)
      .then(() => history.push('/livres'))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <Header/>
    <h1>Ajouter un Nouveau Livre</h1>
    <form onSubmit={handleSubmit} className='form-aj'>
      <div className='dv'>
        <label htmlFor="titre">Titre :</label>
        <input type="text" name="titre" placeholder="Titre" onChange={handleChange} className='input1'/> <br />
        </div>
      <div className='dv'>
        <label htmlFor="description">Description :</label>
        <input type="text" name="description" placeholder="Description" onChange={handleChange}className='input2' /><br />
        </div>
     <div className='dv'>
      <label htmlFor="auteur">Auteur :</label>
        <input type="text" name="auteur" placeholder="Auteur" onChange={handleChange}className='input3' /> <br />
     </div>
      <button type="submit" className='button-1'>Ajouter</button>
    </form>
  </div>
  );
};

export default NouveauLivre;
