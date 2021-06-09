import {
  FETCH_ALL,
  CREATE,
  DELETE,
  LIKE,
  UPDATE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
} from "../Constants/ActionTypes";
// eslint-disable-next-line
export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case FETCH_BY_SEARCH:
      console.log(state);
      return { ...state, posts: action.payload };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_POST:
      return {
        ...state,
        post: action.payload.post,
        posts: action.payload.posts,
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case UPDATE:
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case CREATE:
      return { ...state.posts, posts: [...state, action.payload] };
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
