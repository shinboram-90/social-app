import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from '../../api/axios';

const postsAdapter = createEntityAdapter();

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('api/posts');
  return response.data.postList;
});

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost) => {
    const response = await axios.post('api/posts', initialPost);
    return response.data.newPost;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // reactionAdded(state, action) {
    //   const { postId, reaction } = action.payload
    //   const existingPost = state.entities[postId]
    //   if (existingPost) {
    //     existingPost.reactions[reaction]++
    //   }
    // },
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.entities[id];
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, postsAdapter.addOne);
  },
});

export const { postAdded, postUpdated } = postsSlice.actions;

export default postsSlice.reducer;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
);
