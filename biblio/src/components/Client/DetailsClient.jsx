// ClientDetail.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ClientDetail = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);

  useEffect(() => {
    axios.get(`/api/v1/client/${id}`)
      .then(response => setClient(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!client) return <div>Chargement...</div>;

  return (
    <div>
      <h1>{client.nom} {client.prenom}</h1>
      <p>{client.email}</p>
      <Link to={`/clients/${client.id}/editer`}>Editer</Link>
    </div>
  );
};

export default ClientDetail;
