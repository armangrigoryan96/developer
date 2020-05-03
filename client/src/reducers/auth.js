import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  LOGOUT,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  PROFILE_EDIT_FAIL,
  PROFILE_EDIT_SUCCESS,
  AUTH_ERROR,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL
} from "../actions/constants";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case PROFILE_EDIT_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };

    case LOGOUT:
      localStorage.removeItem("token");
      return {
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:

    case AUTH_ERROR:
    case DELETE_USER_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };

    case PROFILE_EDIT_FAIL:
    case DELETE_USER_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}
