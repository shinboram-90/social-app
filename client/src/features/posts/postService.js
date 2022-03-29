import axios from '../../api/axios';
// import { selectPostById } from './postsSlice';

const createPost = async (post) => {
  const API_Post = `api/posts/`;
  const response = await axios.post(API_Post, post);
  return response.data;
};

const getPosts = async () => {
  const API_Post = `api/posts/`;
  const response = await axios.get(API_Post);
  console.log(response.data);
  return response.data.postList;
};

const updatePost = async (postId, post) => {
  const API_Post = `api/posts/${postId}`;
  const response = await axios.put(API_Post, post);
  return response.data;
};

const deletePost = async (postId) => {
  const API_Post = `api/posts/${postId}`;
  const response = await axios.delete(API_Post);
  return response.data;
};

const PostService = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
};

export default PostService;
