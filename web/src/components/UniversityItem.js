import React from 'react';
import { NavLink } from 'react-router-dom';
import * as styles from './styles/university-item.module.css';
import { ImNewTab, ImStarEmpty, ImStarFull } from 'react-icons/im';

const UniversityItem = ({ id, name, description, country }) => {
  return (
    <li className={styles.university}>
      <NavLink to={`/universities/${id}`}>
        <div className={styles.mainContainer}>
          <div className={styles.title}>
            <div className={styles.info}>
              <h3>{name}</h3>
              <p>{country}</p>
            </div>
            <div className={styles.actions}>
              <ImStarFull className={`${styles.fullfilled} ${styles.icon}`} />
              <ImNewTab />
            </div>
          </div>
          <div className={styles.description}>
            <p>{description}</p>
          </div>
        </div>
      </NavLink>
    </li>
  );
};

export default UniversityItem;
