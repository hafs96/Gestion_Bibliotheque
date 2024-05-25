// NouveauClient.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import './clients.css'
const NouveauClient = () => {
  const [client, setClient] = useState({ nom: '', prenom: '', email: '' });
  const history = useNavigate();

  const handleChange = e => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/api/v1/client', client)
      .then(() => history.push('/clients'))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <Header/>
      <h1>Ajouter un Nouveau Client</h1>
      <form onSubmit={handleSubmit} className='form-aj'>
        <div className='dv'>
          <label htmlFor="nom">Nom :</label>
          <input type="text" name="nom" placeholder="Nom" onChange={handleChange} className='input1'/>
        </div>
        <div className="dv">
          <label htmlFor="prenom">Prenom :</label>
          <input type="text" name="prenom" placeholder="Prénom" onChange={handleChange} className='input2'/>

        </div>
        <div className='dv'>
            <label htmlFor="email">Email :</label>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} className='input3'/>

        </div>
        <button type="submit" className='button-1'>Ajouter</button>
      </form>
    </div>
  );
};

export default NouveauClient;
