import React from 'react';
import * as styles from './styles/input.module.css';

const Input = ({ field, form, ...props }) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor={field.name}>
        {props.label}
      </label>
      <input className={styles.input} {...field} {...props} />
    </div>
  );
};

export default Input;
