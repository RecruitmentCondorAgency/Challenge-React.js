import { LOGGED_IN, LOG_OUT, SET_CURRENT_UNIVERSITY, UPDATE_USER } from './constants';

export const initialState = {
  user: null,
  university: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return {
        ...state,
        user: action.payload,
        university: null
      };
    case LOG_OUT:
      return {
        ...state,
        user: null
      };
    case SET_CURRENT_UNIVERSITY:
      return {
        ...state,
        university: state.user.universities.find((uni) => uni.id === action.payload)
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload.data,
        university: action.payload.isActive ? null : state.university
      };
    default:
      return {
        ...state
      };
  }
};

export default authReducer;
