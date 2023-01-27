import { useState } from 'react';
import InputSearch from '../../components/search/InputSearch';
import UniversityList from '../../components/universityList/UniversityList';
import * as styles from './styles.module.css';

const UniversitiesPage = () => {
  const [universities, setUniversities] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  return (
    <div className={styles.wrapper}>
      <InputSearch
        placeholder="Search an university"
        setUniversities={setUniversities}
        setIsEmpty={setIsEmpty}
      />
      {isEmpty ? (
        <h4>Oh! There are not results.</h4>
      ) : (
        <UniversityList universities={universities} />
      )}
    </div>
  );
};

export default UniversitiesPage;
