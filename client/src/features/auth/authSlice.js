import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { getToken, removeToken, setToken } from '../../utils/HelperFunctions';
import axios from '../../api/axios';

const authAdapter = createEntityAdapter();

const initialState = authAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const fetchMe = createAsyncThunk('auth/fetchMe', async () => {
  const accessToken = getToken();
  axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
  const response = await axios.get('api/user');
  return { ...response.data, accessToken };
});

export const login = createAsyncThunk('auth/login', async (payload) => {
  const response = await axios.post('api/login', payload);
  setToken(response.data.token);
  // navigate to ('/');
  return response.data.user[0];
});

export const signup = createAsyncThunk('auth/signup', async (payload) => {
  const response = await axios.post('api/signup', payload);
  // navigate to ('api/login');
  return response.data;
});

export const signOut = createAsyncThunk('auth/signOut', async () => {
  removeToken();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signOut.fulfilled, (state, action) => {
        state.status = 'suceeded';
        state.userData = {};
        state.token = null;
      })
      .addCase(login.pending, (state, action) => {
        state.loading = 'true';
      })
      .addCase(login.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;
        state.token = accessToken;
        state.userData = user;
        state.status = 'suceeded';
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.userData = {};
        state.token = null;
      })
      .addCase(signup.pending, (state, action) => {
        state.loading = 'true';
      })
      .addCase(signup.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;
        state.token = accessToken;
        state.userData = user;
        state.status = 'suceeded';
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.userData = {};
        state.token = null;
      });
  },
});

export const {} = authSlice.actions;

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

export const authSelector = (state) => state.auth;
