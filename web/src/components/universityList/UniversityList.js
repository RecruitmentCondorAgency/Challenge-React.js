import UniversityItem from '../universityItem/UniversityItem';
import * as styles from './styles.module.css';

const UniversityList = ({ universities }) => {
  return (
    <ul className={styles.list}>
      {universities.map((university) => (
        <UniversityItem key={university.name} {...university} />
      ))}
    </ul>
  );
};

export default UniversityList;
