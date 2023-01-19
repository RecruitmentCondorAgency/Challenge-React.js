import React, { useContext, useEffect, useRef } from 'react';
import * as styles from './styles.module.css';
import { ImNewTab } from 'react-icons/im';
import { addToFavorite, removeFromFavorite } from '../../lib/actions/favorite';
import { AuthContext } from '../../lib/contexts/AuthContext';
import FavoriteStar from '../favoriteStar/FavoriteStar';
import { setCurrentUniversity } from '../../lib/actions/university';

const UniversityItem = ({ id, name, description, country }) => {
  const {
    state: { user },
    dispatch
  } = useContext(AuthContext);
  const controllerRef = useRef(null);

  useEffect(() => {
    controllerRef.current = new AbortController();

    return () => controllerRef.current.abort();
  }, []);

  const isFavorite = user.universities.some((uni) => uni.id === id);

  const clickHandler = () => {
    const args = {
      university: {
        id,
        name,
        description,
        country
      },
      user,
      universities: user.universities,
      controller: controllerRef.current,
      errorCb: () => alert('Uups')
    };
    if (isFavorite) {
      removeFromFavorite(dispatch)(args);
    } else {
      addToFavorite(dispatch)(args);
    }
  };

  return (
    <li className={styles.university}>
      <div className={styles.mainContainer}>
        <div className={styles.title}>
          <div className={styles.info}>
            <h3>{name}</h3>
            <p>{country.name}</p>
          </div>
          <div className={styles.actions}>
            <FavoriteStar clickHandler={clickHandler} favorite={isFavorite} />
            <ImNewTab onClick={() => setCurrentUniversity(dispatch, id)} />
          </div>
        </div>
        <div className={styles.description}>
          <p>{description}</p>
        </div>
      </div>
    </li>
  );
};

export default UniversityItem;
