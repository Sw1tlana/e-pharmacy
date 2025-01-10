import axios from "../../helpers/axiosConfig";

export const setAuthHeader = (token) => {
  console.log(token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    console.log('Token', token);
};

export const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
};

export const setupAxiosInterceptors = (store) => {
  axios.interceptors.request.use(
    (config) => {
      const state = store.getState();
      const token = state.auth.token;
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const requestSignUp = async (formData) => {
  console.log('Registration form data:', formData);
  const { data } = await axios.post('/user/register', formData);
  console.log('Server response after registration:', data);
  setAuthHeader(data.token);
  return data;
};

export const requestSignIn = async (email, password) => {
  if (typeof email !== 'string' || typeof password !== 'string') {
    console.error('Email and password must be strings');
    throw new Error('Email and password must be strings');
  }

  const response = await axios.post('/user/login', { email, password });
  return response.data;
};

export const requestLogOut = async () => {
  await axios.post('/user/logout');
  clearAuthHeader();
};

export const getRefreshToken = async (refreshToken) => {
  const { data } = await axios.post('/user/refresh-tokens', { refreshToken });
  console.log('New tokens from refresh:', data); 
  return data;
};

// stores

export const getStores = async() => {
  const { data } = await axios.get('/stores');
  return data;
};

export const getNearestStores = async() => {
  const { data } = await axios.get('/stores/nearest');
  return data;
};

// medicines

export const getMedicines = async(queryParams = '') => {
   const { data } = await axios.get(`/products${queryParams}`);
   return data;
};

export const getMedicinesId = async (id) => {
  const { data } = await axios.get(`/products/${id}`); 
  return data;
};

// reviews

export const getReviews = async() => {
  const { data } = await axios.get('/customer-reviews');
  return data;
}

// cart

export const getCart = async() => {
  const { data } = await axios.get('/cart');
  return data;
};

export const updateCart = async (userId, updatedProducts, paymentMethod = null) => {
  console.log('userId:', userId); // Логування userId
  console.log('updatedProducts:', updatedProducts); // Логування updatedProducts
  console.log('Updating cart with payload:', { userId, updatedProducts, paymentMethod });
  const payload = {
    userId,
    updatedProducts,
    ...(paymentMethod && { paymentMethod })
  };

  const { data } = await axios.put('/cart/update', payload);
  console.log('Response from server:', data);
  return data;
};