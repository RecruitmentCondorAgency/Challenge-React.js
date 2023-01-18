import * as styles from './styles.module.css';

const IconButton = ({ children, clickHandler, type = 'button' }) => {
  return (
    <button className={styles.button} onClick={clickHandler} type={type}>
      {children}
    </button>
  );
};

export default IconButton;
