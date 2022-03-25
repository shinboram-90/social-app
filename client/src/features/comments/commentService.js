import axios from '../../api/axios';
// import { selectPostById } from './postsSlice';

const createComment = async (postId, commentId) => {
  const API_COMMENT = `api/${postId}/comments/`;
  const response = await axios.post(API_COMMENT + commentId);
  console.log(response.data);
  return response.data;
};

const getComments = async (postId) => {
  const API_COMMENT = `api/${postId}/comments/`;
  const response = await axios.get(API_COMMENT);
  console.log(response.data);
  return response.data;
};

const deleteComment = async (postId, commentId) => {
  const API_COMMENT = `api/${postId}/comments/`;
  const response = await axios.delete(API_COMMENT + commentId);
  console.log(response.data);
  return response.data;
};

const commentService = {
  createComment,
  getComments,
  deleteComment,
};

export default commentService;
