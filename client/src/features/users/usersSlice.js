import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

const initialState = {
  users: [],
  status: 'idle',
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchPosts', async () => {
  const response = await axios.get('api/users');
  return response.data;
});

// export const addNewPost = createAsyncThunk(
//   'posts/addNewPost',
//   async (initialPost) => {
//     const response = await axios.post('api/posts', initialPost);
//     return response.data;
//   }
// );

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // likeAdded(state, action) {
    //   const {postId, userId, like} = action.payload
    //   const existingPost = state.posts.find((post) => post.id === postId)
    //   const existingUser = state.posts.find((user) => user.id === userId)
    //   if(existingPost && existingUser) {
    //     existingPost.likes[like]++
    //   }
    // }
    userUpdated(state, action) {
      const { id, first_name, last_name, biography, avatar } = action.payload;
      const existingUser = state.users.find((user) => user.id === id);
      if (existingUser) {
        existingUser.first_name = first_name;
        existingUser.last_name = last_name;
        existingUser.biography = biography;
        existingUser.avatar = avatar;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'suceeded';
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { userUpdated } = usersSlice.actions;

export default usersSlice.reducer;

export const selectAllUsers = (state) => state.users.users;
