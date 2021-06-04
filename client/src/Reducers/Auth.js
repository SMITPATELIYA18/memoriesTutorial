import { AUTH, LOGOUT } from "../Constants/ActionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case LOGOUT:
      localStorage.removeItem("profile");
      return { ...state, authData: null };
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    default:
      return state;
  }
};

export default authReducer;
