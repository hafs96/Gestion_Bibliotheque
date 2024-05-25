// RetournerEmprunt.jsx
import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const RetournerEmprunt = () => {
  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    axios.post(`/api/v1/emprunt/${id}/retourner`)
      .then(() => history.push('/emprunts'))
      .catch(error => console.error(error));
  }, [id, history]);

  return (
    <div>
      <h1>Retourner Emprunt</h1>
      <p>Emprunt retourné avec succès</p>
    </div>
  );
};

export default RetournerEmprunt;
