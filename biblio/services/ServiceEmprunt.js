import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1/emprunt';

export const addEmprunt = async (emprunt) => {
  const response = await axios.post(API_URL, emprunt);
  return response.data;
};

export const returnBook = async (id) => {
  const response = await axios.post(`${API_URL}/retour`, { idEmprunt: id });
  return response.data;
};

export const getEmpruntsByClient = async (idClient) => {
  const response = await axios.get(`${API_URL}/${idClient}`);
  return response.data;
};
