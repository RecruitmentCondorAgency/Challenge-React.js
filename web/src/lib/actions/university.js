import { SET_CURRENT_UNIVERSITY } from '../reducers/constants';

export const setCurrentUniversity = (dispatch, id) => {
  dispatch({
    type: SET_CURRENT_UNIVERSITY,
    payload: id
  });
};
