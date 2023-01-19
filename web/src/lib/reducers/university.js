import { SEARCH_UNIVERSITY, SET_UNIVERSITIES, SET_UNIVERSITY } from './constants';

export const initialState = {
  universities: [],
  university: null,
  search: ''
};

const universityReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_UNIVERSITIES:
      return {
        ...state,
        universities: action.payload
      };
    case SET_UNIVERSITY:
      return {
        ...state,
        university: action.payload
      };
    case SEARCH_UNIVERSITY:
      return {
        ...state,
        search: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export default universityReducer;
