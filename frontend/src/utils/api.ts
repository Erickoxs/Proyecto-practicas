import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL , // Ajusta la URL si es necesario
});

// Interceptor de respuesta
api.interceptors.response.use(
  (response) => {
    
    console.log('Interceptor Response:', response); // Verifica la respuesta aquí
    return response;
  },
  (error) => {
    console.error('Axios Error:', error);
    console.log("Url", process.env.REACT_APP_BACKEND_URL)
    return Promise.reject(error);
  }
);

export default api;
