import { createContext, useEffect, useReducer } from 'react';
import universityReducer, { initialState } from '../reducers/university';
import fetchUniversities from '../actions/fetchUniversities';
import { SET_UNIVERSITIES } from '../reducers/constants';

const UniversityContext = createContext({
  state: initialState,
  dispatch: {}
});

const UniversityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(universityReducer, initialState);

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchUniversities();
      dispatch({
        type: SET_UNIVERSITIES,
        payload: data
      });
    };

    if (state.search) fetch();
  }, [state.search]);

  return (
    <UniversityContext.Provider
      value={{
        state,
        dispatch
      }}>
      <div>{children}</div>
    </UniversityContext.Provider>
  );
};

export { UniversityProvider, UniversityContext };
