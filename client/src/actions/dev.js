import axios from "axios";
import {
  GET_DEVELOPER_SUCCESS,
  GET_ALL_DEVELOPERS_SUCCESS,
  GET_DEVELOPER_FAIL,
  GET_ALL_DEVELOPERS_FAIL,
  COMMENT_WALL_SUCCESS,
  COMMENT_WALL_FAIL,
  GET_MYPOSTS_SUCCESS,
  GET_MYPOSTS_FAIL
} from "./constants";
import { setAlert } from "./general";

export const getAllDevelopers = () => async dispatch => {
  try {
    const res = await axios.get("/api/profiles");
    dispatch({
      type: GET_ALL_DEVELOPERS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_DEVELOPERS_FAIL
    });
  }
};
export const getDeveloper = dev_id => async dispatch => {
  try {
    const res = await axios.get(`/api/profiles/${dev_id}`);
    dispatch({
      type: GET_DEVELOPER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_DEVELOPER_FAIL
    });
  }
};

export const sendComment = (message, user_id) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const formData = {
      messagetype: "wall",
      to: user_id,
      message,
      date: new Date()
    };
  
    const body = JSON.stringify(formData);
    const res = await axios.post(`/api/posts/send`, body, config);
    dispatch({
      type: COMMENT_WALL_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Your comment is sent!', 'success'))
  } catch (err) {
    dispatch({
      type: COMMENT_WALL_FAIL
    });
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
  }
};



export const getMyComments = () => async dispatch => {
  try {
    const res = await axios.get(`/api/posts`);
    dispatch({
      type: GET_MYPOSTS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
   
    dispatch({
      type: GET_MYPOSTS_FAIL
    });
  }
};