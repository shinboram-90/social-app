import axios from '../../api/axios';

const API_REGISTER = 'api/signup/';

const register = async (userData) => {
  const response = await axios.post(API_REGISTER, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  register,
};

export default authService;
