    
import uuid from "uuid";
import { 
  SET_ALERT, 
  REMOVE_ALERT,
  BACKGROUND_CHANGE,
  REDIRECT,


 } from "./constants";

export const setAlert = (msg, alertType, timeOut=5000) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: id
      }),
    timeOut
  );
};


// redirect Home
export const redirect = (redirect) => async dispatch => {
  dispatch({
    type: REDIRECT,
    payload: redirect
   });
   dispatch({
     type: REDIRECT,
     payload: ""
   })
};

// background change
export const backgroundChange = background => async dispatch => {
  dispatch({
    type: BACKGROUND_CHANGE,
    payload: background
  });
};

