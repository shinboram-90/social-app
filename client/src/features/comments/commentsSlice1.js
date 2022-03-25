// import {
//   createSlice,
//   createAsyncThunk,
//   createSelector,
//   createEntityAdapter,
// } from '@reduxjs/toolkit';
// import axios from '../../api/axios';

// const commentsAdapter = createEntityAdapter();

// const initialState = commentsAdapter.getInitialState({
//   status: 'idle',
//   error: null,
// });

// export const fetchComments = createAsyncThunk(
//   'comments/fetchComments',
//   async (postId) => {
//     const response = await axios.get(`api/posts/${postId}/comments`);
//     return response.data.commentList;
//   }
// );

// export const addNewComment = createAsyncThunk(
//   'comments/addNewComment',
//   async (postId, initialComment) => {
//     const response = await axios.post(
//       `api/posts/${postId}/comments`,
//       initialComment
//     );
//     return response.data.newComment;
//   }
// );

// const commentsSlice = createSlice({
//   name: 'comments',
//   initialState,
//   reducers: {
//     // reactionAdded(state, action) {
//     //   const { postId, reaction } = action.payload
//     //   const existingPost = state.entities[postId]
//     //   if (existingPost) {
//     //     existingPost.reactions[reaction]++
//     //   }
//     // },
//     // commentUpdated(state, action) {
//     //   const { id, postId, title, content } = action.payload;
//     //   const existingComment = state.entities[id];
//     //   if (existingComment) {
//     //     existingComment.title = title;
//     //     existingComment.content = content;
//     //     existingComment.postId = postId;
//     //   }
//     // },
//   },
//   extraReducers(builder) {
//     builder
//       .addCase(fetchComments.pending, (state, action) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchComments.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         // Add any fetched posts to the array
//         commentsAdapter.upsertMany(state, action.payload);
//       })
//       .addCase(fetchComments.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(addNewComment.fulfilled, commentsAdapter.addOne);
//   },
// });

// // export const { commentAdded, commentUpdated } = commentsSlice.actions;

// export default commentsSlice.reducer;

// export const {
//   selectAll: selectAllComments,
//   // selectById: selectCommentById,
//   // selectIds: selectCommentIds,
// } = commentsAdapter.getSelectors((state) => state.comments);

// export const selectCommentsByPost = createSelector(
//   [selectAllComments, (state, postId) => postId],
//   (comments, postId) => comments.filter((comment) => comment.postId === postId)
// );
