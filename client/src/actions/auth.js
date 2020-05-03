import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { setAlert, redirect } from "./general";
import { loadProfile } from './profile'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  PROFILE_EDIT_FAIL,
  PROFILE_EDIT_SUCCESS,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,

 
} from "./constants";

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
    dispatch(loadProfile());

  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const register = formData => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify(formData);
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

//login

export const login = formData => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify(formData);
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

//logout

export const logout = () => async dispatch => {
  dispatch({
    type: LOGOUT
  });
};



//change profile

export const editProfile = formData => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify(formData);


    const res = await axios.post("/api/auth/credentials", body, config);

    dispatch(loadUser());
    dispatch(setAlert("Changes are saved!", "success"));
    dispatch({
      type: PROFILE_EDIT_SUCCESS,
      payload: res.data
    })
    dispatch(redirect("home"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_EDIT_FAIL
    });
  }
};

export const deleteProfile = () => async dispatch=> {
  if (window.confirm("Are you sure?? This can NOT be undone!"))
    try {
      const res = await axios.delete('/api/auth') 
      dispatch({
        type: DELETE_USER_SUCCESS,
        payload: res.data
      })
      dispatch(setAlert("User account is fully deleted", "success"))
      dispatch({
        type: LOGOUT
      })  
    } catch (err) {
      dispatch({
        type: DELETE_USER_FAIL
      })
    }
}