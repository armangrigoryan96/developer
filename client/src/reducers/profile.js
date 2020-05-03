import {
  LOGOUT,
  ADD_EXPERIENCE_SUCCESS,
  ADD_EXPERIENCE_FAIL,
  DELETE_EXPERIENCE_SUCCESS,
  DELETE_EXPERIENCE_FAIL,
  GET_EXPERIENCE_SUCCESS,
  GET_EXPERIENCE_FAIL,
  PROFILE_LOADED,
  PROFILE_NOTLOADED,
  ADD_EDUCATION_SUCCESS,
  ADD_EDUCATION_FAIL,
  DELETE_EDUCATION_SUCCESS,
  DELETE_EDUCATION_FAIL,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_FAIL,
  ADD_SOCIALS_SUCCESS,
  ADD_SOCIALS_FAIL,
  ADD_ABOUT_SUCCESS,
  ADD_ABOUT_FAIL,
  EDIT_EXPERIENCE_SUCCESS,
  EDIT_EXPERIENCE_FAIL,
  GET_EDUCATION_SUCCESS,
  GET_EDUCATION_FAIL,
  EDIT_EDUCATION_SUCCESS,
  EDIT_EDUCATION_FAIL
} from "../actions/constants";

const initialState = {
  about: null,
  experience: null,
  experience_single: null,
  education: null,
  education_single: null,
  contact: null,
};
export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGOUT:
      return {
        about: null,
        experience: null,
        experience_single: null,
        education: null,
        education_single: null,
        contact: null
      };
    case ADD_ABOUT_SUCCESS:
      return {
        ...state,
        about: payload
      };
    case ADD_EXPERIENCE_SUCCESS:
    case DELETE_EXPERIENCE_SUCCESS:
      return {
        ...state,
        experience: payload
      };
    case GET_EXPERIENCE_SUCCESS:
      return {
        ...state,
        experience_single: payload
      };
    case GET_EDUCATION_SUCCESS:
      return {
        ...state,
        education_single: payload
      };
    case ADD_EDUCATION_SUCCESS:
    case DELETE_EDUCATION_SUCCESS:
      return {
        ...state,
        education: payload
      };

    case ADD_CONTACT_SUCCESS:
      return {
        ...state,
        contact: payload
      };
    case ADD_SOCIALS_SUCCESS:
      return {
        ...state,
        contact: {
          socials: payload
        }
      };

    case PROFILE_LOADED:
      return {
        ...state,
        ...payload
      };
    case EDIT_EXPERIENCE_SUCCESS:
    case EDIT_EXPERIENCE_FAIL:
      return {
        ...state,
        experience_single: null
      };
    case EDIT_EDUCATION_SUCCESS:
    case EDIT_EDUCATION_FAIL:
      return {
        ...state,
        education_single: null
      };
    case PROFILE_NOTLOADED:
    case ADD_EXPERIENCE_FAIL:
    case ADD_EDUCATION_FAIL:
    case ADD_CONTACT_FAIL:
    case ADD_SOCIALS_FAIL:
    case ADD_ABOUT_FAIL:
    case DELETE_EXPERIENCE_FAIL:
    case DELETE_EDUCATION_FAIL:
    case GET_EXPERIENCE_FAIL:
    case GET_EDUCATION_FAIL:
      return {
        ...state
      };

    default:
      return state;
  }
}
