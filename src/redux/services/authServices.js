import axios from "../../helpers/axiosConfig";
import { setToken } from '../auth/slice.js';

export const setAuthHeader = (token) => {
  console.log(token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    console.log('Token', token);
};

export const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
};

export const requestSingUp = async(formData) => {
  try {
    console.log('Request data:', formData);
    const { data } = await axios.post('/user/register', formData);
    console.log('Response data:', data);

    if (data.token && data.user) {
      // Повертаємо повну відповідь
      return data;
    } else {
      throw new Error('Invalid API response: missing user or token');
    }
  } catch (error) {
    console.error('API Error:', error);
    throw error;  // Проброс помилки
  }
};

export const requestSingIn = async(formData) => {
  try {
    const { data } = await axios.post('/user/login', formData);
    console.log(data);
    
    if (!data.token || !data.refreshToken) {
      throw new Error('Token or refresh token is missing in the response');
    }

    setAuthHeader(data.token);
    return data;
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
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

export const refreshAuthToken = async (dispatch, token, refreshToken) => {
  try {
    const response = await axios.post('/users/refresh-tokens', { refreshToken }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const { token: newToken, refreshToken: newRefreshToken } = response.data;

    dispatch(setToken({ token: newToken, refreshToken: newRefreshToken }));
  } catch (error) {
    console.error('Error fetching refresh token:', error);
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