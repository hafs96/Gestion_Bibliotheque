// Clients.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/client')
      .then(response => setClients(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <Header/>
      <h1>Liste des Clients</h1>
      <button className='button-1'><Link to="/clients/nouveau" className='link'>Ajouter un Nouveau Client</Link></button>
      <ul>
        {clients.map(client => (
          <li key={client.id}>
            <Link to={`/clients/${client.id}`}>{client.nom} {client.prenom}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clients;
