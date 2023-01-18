import * as styles from './styles.module.css';
import IconButton from '../iconbutton/IconButton';
import { ImSearch } from 'react-icons/im';

const InputSearch = () => {
  return (
    <div className={styles.searchContainer}>
      <input placeholder="University name" name="search" type="search" className={styles.input} />
      <IconButton>
        <ImSearch />
      </IconButton>
    </div>
  );
};

export default InputSearch;
