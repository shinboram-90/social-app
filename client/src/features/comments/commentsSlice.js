import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from '../../api/axios';
// import commentService from './commentService';

const commentsAdapter = createEntityAdapter({
  selectId: (comment) => comment.id,
});

const initialState = commentsAdapter.getInitialState({
  status: 'idle',
  error: null,
  data: null,
});

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId) => {
    const { data } = await axios.get(`api/posts/${postId}/comments`);
    console.log(data);
    return data.commentList;
  }
);

export const addNewComment = createAsyncThunk(
  'comments/addNewComment',
  async (postId, initialComment) => {
    const response = await axios.comment(
      `api/posts/${postId}/comments`,
      initialComment
    );
    return response.data.newComment;
  }
);

export const updatecomment = createAsyncThunk(
  'comments/updatecomment',
  async (comment, thunkAPI) => {
    const response = await axios
      .put(`api/comments/${comment.id}`, comment)
      .catch((err) => {
        thunkAPI.rejectWithValue(err);
        throw err;
      });
    console.log(response.data);
    return response.data;
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addNewComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments.push(action.payload);
      })
      .addCase(addNewComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchComments.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched Comments to the array
        commentsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    // .addCase(getComments.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(getComments.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.comments.push(action.payload);
    // })
    // .addCase(getComments.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.message = action.payload;
    // })
    // .addCase(deleteComment.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(deleteComment.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.comments = state.comments.filter(
    //     (comment) => comment.id !== action.payload.id
    //   );
    // })
    // .addCase(deleteComment.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.message = action.payload;
    // });
  },
});

export const { reset } = commentsSlice.actions;

export default commentsSlice.reducer;
