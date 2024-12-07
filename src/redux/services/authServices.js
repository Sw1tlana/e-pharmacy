import axios from "../../../helpers/axiosConfig";

export const setAuthHeader = (token) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
};

export const requestSingUp = async(formData) => {
 const { data } = await axios.post('/user/register', formData);
 setAuthHeader(data.token);
 return data
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