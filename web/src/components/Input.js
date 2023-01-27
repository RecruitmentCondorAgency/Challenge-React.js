import * as styles from './styles/input.module.css';

const Input = ({ htmlFor, label, ...props }) => {
  return (
    <div className={styles.inputContainer}>
      {label ? (
        <label className={styles.label} htmlFor={htmlFor}>
          {label}
        </label>
      ) : null}
      <input className={styles.input} {...props} />
    </div>
  );
};

export default Input;
