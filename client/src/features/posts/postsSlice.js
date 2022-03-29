import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from '../../api/axios';

const postsAdapter = createEntityAdapter({
  selectId: (post) => post.id,
});

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
  data: null,
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('api/posts');
  console.log(data);
  return data.postList;
});

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost) => {
    const response = await axios.post('api/posts', initialPost);
    return response.data.newPost;
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (post, thunkAPI) => {
    const { id, title, content, image } = post;
    const response = await axios
      .put(`api/posts/${id}`, { title, content, image })
      .catch((err) => {
        thunkAPI.rejectWithValue(err);
        throw err;
      });
    console.log(response.data);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId) => {
    const response = await axios.delete(`api/posts/${postId}`);
    return response.data;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    updateOnePost: postsAdapter.updateOne,
    // reactionAdded(state, action) {
    //   const { postId, reaction } = action.payload
    //   const existingPost = state.entities[postId]
    //   if (existingPost) {
    //     existingPost.reactions[reaction]++
    //   }
    // },
    // postDeleted: (state, action) => {
    //   console.log(state.posts);
    //   state.posts = state.posts.filter((post) => post.id !== action.payload);
    // },
    postUpdated(state, action) {
      const { id, title, content, image } = action.payload;
      const existingPost = state.entities[id];
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
        existingPost.image = image;
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
      .addCase(updatePost.fulfilled, postsAdapter.upsertOne)
      .addCase(addNewPost.fulfilled, postsAdapter.addOne)
      .addCase(deletePost.fulfilled, postsAdapter.removeOne);
  },
});

export const { postUpdated } = postsSlice.actions;

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
