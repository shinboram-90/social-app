import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import commentService from './commentService';

const initialState = {
  comments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const createComment = createAsyncThunk(
  'comments/create',
  async (commentData, thunkAPI) => {
    try {
      return await commentService.createComment(commentData);
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

export const getComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId, thunkAPI) => {
    try {
      return await commentService.getComments(postId);
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

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentData, thunkAPI) => {
    try {
      return await commentService.deleteComment(commentData);
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

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments.push(action.payload);
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
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
