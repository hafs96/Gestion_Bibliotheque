import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/client';

export const getClients = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addClient = async (client) => {
  const response = await axios.post(API_URL, client);
  return response.data;
};

export const updateClient = async (id, client) => {
  const response = await axios.put(`${API_URL}/${id}`, client);
  return response.data;
};

export const deleteClient = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
