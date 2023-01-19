import * as styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { getUniversitiesByName } from '../../lib/actions/university';
import AsyncSelect from 'react-select/async';
import _ from 'lodash';

const InputSearch = ({ placeholder, setUniversities, setIsEmpty }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const fetch = async () => {
      if (value === '') {
        setUniversities([]);
        setIsEmpty(false);
      } else {
        const universities = await getUniversitiesByName(value);
        setIsEmpty(universities.length === 0);
        setUniversities(universities);
      }
    };

    fetch();
  }, [value]);

  const loadOptions = _.debounce((name) => getUniversitiesByName(name), 500);
  return (
    <div className={styles.searchContainer}>
      <AsyncSelect
        onChange={(uni) => setValue(uni.name)}
        noOptionsMessage={() => 'No universities'}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.id}
        placeholder={placeholder}
        loadOptions={(inputValue) => loadOptions(inputValue)}
        className={styles.input}
      />
    </div>
  );
};

export default InputSearch;
