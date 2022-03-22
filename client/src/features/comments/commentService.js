import axios from '../../api/axios';
// import { selectPostById } from './postsSlice';

const createComment = async (postId, commentId, token) => {
  const API_COMMENT = `api/${postId}/comments/`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_COMMENT + commentId, config);
  return response.data;
};

const getComments = async (postId, token) => {
  const API_COMMENT = `api/${postId}/comments/`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_COMMENT, config);
  return response.data;
};

const deleteComment = async (postId, commentId, token) => {
  const API_COMMENT = `api/${postId}/comments/`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_COMMENT + commentId, config);
  return response.data;
};

const commentService = {
  createComment,
  getComments,
  deleteComment,
};

export default commentService;
