// NouveauEmprunt.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import './emprunts.css'
const NouveauEmprunt = () => {
  const [emprunt, setEmprunt] = useState({ livreId: '', clientId: '' });
  const history = useNavigate();

  const handleChange = e => {
    setEmprunt({ ...emprunt, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/api/v1/emprunt', emprunt)
      .then(() => history.push('/emprunts'))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <Header/>
      <h1>Ajouter un Nouvel Emprunt</h1>
      <form onSubmit={handleSubmit} className='form-aj'>
      <div className='dv'>
        <label htmlFor="livreId">livreId :</label>
        <input type="text" name="livreId" placeholder="ID Livre" onChange={handleChange} className='input1'/>

        </div>
      <div className='dv'>
        <label htmlFor="clientId">clientId :</label>
        <input type="text" name="clientId" placeholder="ID Client" onChange={handleChange} className='input2'/>

        </div>
    
        <button type="submit" className='button-1'>Ajouter</button>
    </form>

    </div>
  );
};

export default NouveauEmprunt;
