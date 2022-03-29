import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './postService';

const initialState = {
  post: null,
  isError: null,
  isSuccess: null,
  isLoading: false,
  message: '',
};
export const createPost = createAsyncThunk(
  'posts/create',
  async ({ title, content, image }) => {
    const res = await postService.createPost({ title, content, image });
    return res.data;
  }
);
export const retrievePosts = createAsyncThunk('posts/retrieve', async () => {
  const res = await postService.getPosts();
  console.log(res);
  return res;
});

export const updatePost = createAsyncThunk(
  'posts/update',
  async ({ id, data }) => {
    const res = await postService.updatePost(id, data);
    return res.data;
  }
);
export const deletePost = createAsyncThunk('posts/delete', async ({ id }) => {
  await postService.deletePost(id);
  return { id };
});

const postSlice = createSlice({
  name: 'post',
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
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.post = action.payload;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.post = null;
      })
      .addCase(retrievePosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(retrievePosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.post = action.payload;
      })
      .addCase(retrievePosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.post = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.post = null;
      });
  },
});

// const postSlice = createSlice({
//   name: 'post',
//   initialState,
//   extraReducers: {
//     [createPost.fulfilled]: (state, action) => {
//       state.push(action.payload);
//     },
//     [retrievePosts.fulfilled]: (state, action) => {
//       console.log(action.payload);
//       return { ...action.payload };
//     },
//     [updatePost.fulfilled]: (state, action) => {
//       const index = state.findIndex((post) => post.id === action.payload.id);
//       state[index] = {
//         ...state[index],
//         ...action.payload,
//       };
//     },
//     [deletePost.fulfilled]: (state, action) => {
//       let index = state.findIndex(({ id }) => id === action.payload.id);
//       state.splice(index, 1);
//     },
//   },
// });
export default postSlice.reducer;
