// EditerClient.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditerClient = () => {
  const { id } = useParams();
  const [client, setClient] = useState({ nom: '', prenom: '', email: '' });
  const history = useNavigate();

  useEffect(() => {
    axios.get(`/api/v1/client/${id}`)
      .then(response => setClient(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleChange = e => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`/api/v1/client/${id}`, client)
      .then(() => history.push(`/clients/${id}`))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Editer Client</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nom" value={client.nom} onChange={handleChange} />
        <input type="text" name="prenom" value={client.prenom} onChange={handleChange} />
        <input type="email" name="email" value={client.email} onChange={handleChange} />
        <button type="submit">Sauvegarder</button>
      </form>
    </div>
  );
};

export default EditerClient;
