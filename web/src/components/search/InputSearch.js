import * as styles from './styles.module.css';
import IconButton from '../iconbutton/IconButton';
import { ImSearch } from 'react-icons/im';
import { useState } from 'react';
import useDebounce from '../../hooks/useDebounce';

const InputSearch = ({ placeholder }) => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 1000);

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
