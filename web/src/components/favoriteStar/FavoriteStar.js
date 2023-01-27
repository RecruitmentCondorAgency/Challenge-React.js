import React from 'react';
import { ImStarFull, ImStarEmpty } from 'react-icons/im';
import * as styles from './styles.module.css';

const FavoriteStar = ({ favorite, clickHandler }) => {
  const classes = `${styles.fullfilled} ${styles.icon}`;
  return favorite ? (
    <ImStarFull onClick={clickHandler} className={classes} />
  ) : (
    <ImStarEmpty className={classes} onClick={clickHandler} />
  );
};

export default FavoriteStar;
