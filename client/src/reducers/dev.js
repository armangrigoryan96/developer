import {
  GET_DEVELOPER_SUCCESS,
  GET_ALL_DEVELOPERS_SUCCESS,
  GET_DEVELOPER_FAIL,
  GET_ALL_DEVELOPERS_FAIL,
  COMMENT_WALL_SUCCESS,
  COMMENT_WALL_FAIL,
  GET_MYPOSTS_SUCCESS,
  GET_MYPOSTS_FAIL
} from "../actions/constants";
const initialState = {
  developers: null,
  developer_single: null,
  sent_comments: null,
  received_comments: null
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_DEVELOPERS_SUCCESS:
      return {
        ...state,
        developers: payload
      };
    case GET_DEVELOPER_SUCCESS:
      return {
        ...state,
        developer_single: payload
      };

    case COMMENT_WALL_SUCCESS:
    case GET_MYPOSTS_SUCCESS:
      return {
        ...state,
        sent_comments: payload.send,
        received_comments: payload.receive
      };

    case GET_ALL_DEVELOPERS_FAIL:
      return {
        ...state,
        developers: null
      };
    case GET_DEVELOPER_FAIL:
      return {
        ...state,
        developer_single: null
      };

    case COMMENT_WALL_FAIL:
    case GET_MYPOSTS_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}
