import axios from "../../helpers/axiosConfig";

export const setAuthHeader = (token) => {
  console.log(token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    console.log('Token', token);
};

export const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
};

export const requestSingUp = async(formData) => {
    console.log('Request data:', formData);
    const { data } = await axios.post('/user/register', formData);
    console.log('Response data:', data);
    setAuthHeader(data.token);
    return data;
};

export const requestSingIn = async(formData) => {
    console.log('Response data from login:', formData);
    const { data } = await axios.post('/user/login', formData);
    setAuthHeader(data.token);
    return data;
};

export const getInfo = async (userId) => {
  try {
      const { data } = await axios.get(`/user/user-info?userId=${userId}`);
      return data;
  } catch (error) {
      console.error('Помилка при запиті до API:', error.message);
      throw new Error('Не вдалося отримати інформацію користувача');
  }
};

export const refreshAuthToken = async (refreshToken) => {
  try {
    const { data } = await axios.post('/user/refresh-tokens', { refreshToken });
    console.log('New access token:', data);
    setAuthHeader(data.token);
    return data;
  } catch (error) {
    console.error('Error refreshing token:', error.message);
    throw new Error('Не вдалося оновити токен');
  }
};

export const requestLogOut = async() => {
    const { data } = await axios.post('/user/logout');
    console.log('Logout Response:', data);
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