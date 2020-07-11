import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-crm.herokuapp.com/'
});

export default api;