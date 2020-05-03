import {
  SET_ALERT,
  REMOVE_ALERT,
  BACKGROUND_CHANGE,
  REDIRECT,

} from "../actions/constants";

const initialState = {
  alert: [],
  background: "home",
  redirect: "",
  location: 'inside'
};
export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
 
    case REDIRECT:
      return {
        ...state,
        redirect: payload
      };

    case BACKGROUND_CHANGE:
      return {
        ...state,
        background: payload
      };
    case SET_ALERT:
      return {
        ...state,
        alert: state.alert.concat(payload)
      };

    case REMOVE_ALERT:
      return {
        ...state,
        alert: state.alert.filter(alert => alert.id !== payload)
      };

    default:
      return state;
  }
}
