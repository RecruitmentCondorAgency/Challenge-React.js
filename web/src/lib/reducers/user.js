import { LOGGED_IN, LOG_OUT, UPDATE_USER } from './constants';

export const initialState = {
  user: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return {
        ...state,
        user: action.payload
      };
    case LOG_OUT:
      return {
        ...state,
        user: null
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export default authReducer;
