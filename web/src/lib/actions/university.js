import { SET_CURRENT_UNIVERSITY } from '../reducers/constants';
import { fetchData } from '../../utils/helpers';
import FetchBuilder from '../../utils/fetchBuilder';

export const setCurrentUniversity = (dispatch, id) => {
  dispatch({
    type: SET_CURRENT_UNIVERSITY,
    payload: id
  });
};

export const getUniversitiesByName = async (name) => {
  const builder = new FetchBuilder('universities');
  if (name !== '') builder.setQuery(name);

  const universities = await fetchData(builder);

  return universities;
};
