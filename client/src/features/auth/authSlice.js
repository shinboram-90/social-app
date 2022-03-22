import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getToken, removeToken, setToken } from '../../utils/HelperFunctions';
import axios from '../../api/axios';
import authService from './authService';

// get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: null,
  isSuccess: null,
  // token: null,
  isLoading: false,
  message: '',
};

export const login = createAsyncThunk(
  'auth/login',
  async (payload, dispatch) => {
    const response = await axios.post('api/login', payload);
    const token = response.data.token;
    const data = response.data.user[0];

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(data));

    // navigate to ('/');
    // const pars = JSON.parse(localStorage.getItem('user'));
    // console.log(pars);
    // dispatch(updateSuccess(data));
    return data;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signOut = createAsyncThunk('auth/signOut', async () => {
  const response = await axios.get('api/logout');
  console.log(response);
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  // not async here
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
    // .addCase(addNewPost.fulfilled, postsAdapter.addOne);
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;

// export const {
//   selectAll: selectAllPosts,
//   selectById: selectPostById,
//   selectIds: selectPostIds,
// } = postsAdapter.getSelectors((state) => state.posts);

// export const selectPostsByUser = createSelector(
//   [selectAllPosts, (state, userId) => userId],
//   (posts, userId) => posts.filter((post) => post.userId === userId)
// );

// export const authSelector = (state) => state.auth;
