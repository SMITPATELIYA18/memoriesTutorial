import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (_id, updatedPost) =>
  API.patch(`/posts/${_id}`, updatedPost);
export const deletePost = (_id) => API.delete(`/posts/${_id}`);
export const likePost = (_id) => API.patch(`/posts/${_id}/likePost`);
export const fetchPostBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );

export const signIn = (formData) => API.post("/users/signIn", formData);
export const signUp = (formData) => API.post("/users/signUp", formData);
