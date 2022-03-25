import axios from '../../api/axios';
import Cookies from 'js-cookie';

const API_REGISTER = 'api/signup/';
const API_LOGIN = 'api/login/';
const API_LOGOUT = 'api/logout/';

const register = async (userData) => {
  const response = await axios.post(API_REGISTER, userData);
  if (response.data) {
    // localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  }
};

const login = async (userData) => {
  const response = await axios.post(API_LOGIN, userData);
  if (response.data) {
    // axios.interceptors.request.use((config) => {
    //   config.headers.Authorization = `Bearer ${response.data.token}`;
    //   console.log(config);
    //   return config;
    // });

    // const cookie = response.data.token;
    // .find((row) => row.startsWith('access_token').split('='[1]));
    localStorage.setItem('user', JSON.stringify(response.data));
    Cookies.get('access_token');

    // console.log(cookie);
  }
  return response.data;
};

const logout = async (userData) => {
  const response = await axios.get(API_LOGOUT, userData);
  if (response.data) {
    localStorage.removeItem('user');
    Cookies.remove('access_token');
  }
  return response.data;
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
