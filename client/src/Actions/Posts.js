import {
  FETCH_ALL,
  CREATE,
  DELETE,
  LIKE,
  UPDATE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
} from "../Constants/ActionTypes";
import * as api from "../API";

//Action Creators

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING});
    const { data } = await api.fetchPosts(page);
    
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING});
  } catch (error) {
    console.log(error.message);
  }
  //   const action = ;
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING});
    const {
      data: { data },
    } = await api.fetchPostBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING});
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING});
    const { data } = await api.createPost(post);
    console.log(data);
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING});
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    // console.log(post);
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
