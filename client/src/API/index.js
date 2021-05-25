import axios from "axios";

const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (_id, updatedPost) =>
  axios.patch(`${url}/${_id}`, updatedPost);
export const deletePost = (_id) => axios.delete(`${url}/${_id}`);
export const likePost = (_id) => axios.patch(`${url}/${_id}/likePost`);
