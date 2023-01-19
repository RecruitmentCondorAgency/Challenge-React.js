import * as styles from './styles.module.css';
import IconButton from '../iconbutton/IconButton';
import { ImSearch } from 'react-icons/im';
import { useContext, useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { SEARCH_UNIVERSITY } from '../../lib/reducers/constants';
import { UniversityContext } from '../../lib/contexts/UniversityContext';

const InputSearch = ({ placeholder }) => {
  const { dispatch } = useContext(UniversityContext);
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 1000);

  useEffect(() => {
    dispatch({
      type: SEARCH_UNIVERSITY,
      payload: debouncedValue
    });
  }, [debouncedValue]);

  return (
    <div className={styles.searchContainer}>
      <input
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        name="search"
        type="search"
        className={styles.input}
      />
      <IconButton>
        <ImSearch />
      </IconButton>
    </div>
  );
};

export default InputSearch;
