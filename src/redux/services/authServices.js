import axios from "../../helpers/axiosConfig";

export const setAuthHeader = (token) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
};

export const requestSingUp = async(formData) => {
    console.log('Request data:', formData);
 const { data } = await axios.post('/user/register', formData);
 console.log('Response data:', data);
 if (data.user && data.token) {
    setAuthHeader(data.token);
    return data; 
  } else {
    throw new Error('Invalid API response: missing user or token');
  }
};

export const requestSingIn = async(formData) => {
  const { data } = await axios.post('/user/login', formData);
  setAuthHeader(data.token);
  return data;
};

export const requestLogOut = async() => {
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