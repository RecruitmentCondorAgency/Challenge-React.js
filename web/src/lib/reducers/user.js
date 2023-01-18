import { LOGGED_IN, LOG_OUT } from './constants';

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
    default:
      return {
        ...state
      };
  }
};

export default authReducer;
