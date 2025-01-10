import axios from "../../helpers/axiosConfig";
import { setToken } from "../auth/slice";

export const setAuthHeader = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};


export const clearAuthHeader = () => {
    axios.defaults.headers.common['Authorization'] = '';
};

export const setupAxiosInterceptors = (store) => {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = store.getState().auth.refreshToken;
        try {
          const newTokens = await store.dispatch(refreshUser({ refreshToken }));
          setAuthHeader(newTokens.token);
          originalRequest.headers['Authorization'] = `Bearer ${newTokens.token}`;
          return axios(originalRequest);
        } catch (err) {
          toast.error('Token refresh failed');
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );
};

export const requestSignUp = async (formData) => {
  try {
    const { data } = await axios.post('/user/register', formData);
    if (data && data.token) {
      setAuthHeader(data.token);
      return data;
    } else {
      toast.error('No token received during registration');
    }
  } catch (error) {
    console.error('API error:', error);
    if (error.response) {
      toast.error(`Server error: ${error.response.data.message || 'Registration failed'}`);
    } else {
      toast.error('Unknown error occurred');
    }
  }
};

export const requestSignIn = async (email, password) => {
  try {
    console.log('Login attempt:', { email, password });
    const { data } = await axios.post('/user/login', { email, password });
    console.log('Login response:', data);
    return data;
  } catch (error) {
    console.error('Login error:', error);
    toast.error(error.response?.data?.message || 'Login failed');
  }
};

export const requestLogOut = async () => {
  try {
    await axios.post('/user/logout');
    clearAuthHeader();
  } catch (error) {
    toast.error('Logout failed');
  }
};

export const getRefreshToken = async (refreshToken) => {
  try {
    const { data } = await axios.post('/user/refresh-tokens', { refreshToken });
    return data;
  } catch (error) {
    toast.error('Failed to refresh token');
    throw error;
  }
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