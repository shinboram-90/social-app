import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from '../../api/axios';

const commentsAdapter = createEntityAdapter();

const initialState = commentsAdapter.getInitialState();

export const fetchComments = createAsyncThunk(
  'comments/fetchcomments',
  async () => {
    const response = await axios.get(`api/posts/${post.id}comments`);
    return response.data.commentList;
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchComments.fulfilled, commentsAdapter.setAll);
  },
});

export default commentsSlice.reducer;

export const { selectAll: selectAllcomments, selectById: selectcommentById } =
  commentsAdapter.getSelectors((state) => state.comments);
