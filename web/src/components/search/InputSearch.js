import * as styles from './styles.module.css';
import IconButton from '../iconbutton/IconButton';
import { ImSearch } from 'react-icons/im';
import { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { getUniversitiesByName } from '../../lib/actions/university';

const InputSearch = ({ placeholder, setUniversities, setIsEmpty }) => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const debouncedValue = useDebounce(value, 700);

  useEffect(() => {
    const fetch = async () => {
      if (debouncedValue === '') {
        setUniversities([]);
        setIsEmpty(false);
      } else {
        setIsLoading(true);
        const universities = await getUniversitiesByName(debouncedValue);
        setIsLoading(false);
        setIsEmpty(universities.length === 0);
        setUniversities(universities);
      }
    };

    fetch();
  }, [debouncedValue]);

  return (
    <div className={styles.searchContainer}>
      <input
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        name="search"
        type="search"
        className={styles.input}
        disabled={isLoading}
      />
    </div>
  );
};

export default InputSearch;
