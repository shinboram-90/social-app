import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

// const initialState = authAdapter.getInitialState({
//   status: 'idle',
//   error: null,
// });

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: '',
    email: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },
});

// createAsyncThunk takes 2 arguments : the name to identify action types and a callback that returns a promise
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (username, email, password) => {
    const response = await axios.post('api/posts', username, email, password);
    if (response.status === 200) {
      localStorage.setItem('token', response.data.token);
      return { ...response.data, username: username, email: email };
    } else {
      console.log('problem signing up');
    }
  }
);

export default authSlice.reducer;

export const authSelector = (state) => state.auth;
