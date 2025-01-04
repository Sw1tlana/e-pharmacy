import axios from "../../helpers/axiosConfig";
import { setToken } from "../auth/slice";

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
      const { token } = store.getState().auth;
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export const requestSignUp = async(formData) => {
    console.log('Request data:', formData);
    const { data } = await axios.post('/user/register', formData);
    console.log('Response data:', formData);
    setAuthHeader(data.token);
    console.log(data);
    return data;
};

export const requestSignIn = async(formData) => {
  try {
    console.log(formData);
    const { data } = await axios.post('/user/login', formData);
    setToken(data.token);
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error in requestSingIn:', error.response?.data || error.message);
    throw error; 
  }
};

export const getRefreshUser = async () => {
    const { data } = await axios.get('/user/user-info');
    return data;
};

export const getRefreshToken = async (refreshToken) => {
    const { data } = await axios.post('/user/refresh-tokens', { refreshToken });
    return data;
};

export const requestLogOut = async () => {
    const { data } = await axios.post('/user/logout');
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