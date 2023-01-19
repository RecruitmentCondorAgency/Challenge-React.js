import React, { useContext } from 'react';
import * as styles from './styles.module.css';
import { ImNewTab } from 'react-icons/im';
import { addToFavorite, removeFromFavorite } from '../../lib/actions/favorite';
import { AuthContext } from '../../lib/contexts/AuthContext';
import useAbortController from '../../hooks/useAbortController';
import FavoriteStar from '../favoriteStar/FavoriteStar';
import { setCurrentUniversity } from '../../lib/actions/university';
import { useLocation, useNavigate } from 'react-router-dom';
import getFavoriteAndActive from '../../utils/unversity';

const UniversityItem = ({ id, name, description, country }) => {
  const location = useLocation();

  const {
    state: { user, university },
    dispatch
  } = useContext(AuthContext);

  const controller = useAbortController();

  const { isFavorite, isActive } = getFavoriteAndActive(user, university, id);

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
      controller: controller,
      errorCb: () => alert('Uups')
    };
    if (isFavorite) {
      removeFromFavorite(dispatch)(args, isActive);
    } else {
      addToFavorite(dispatch)(args);
    }
  };

  return (
    <li
      className={`${styles.university} ${
        isActive && location.pathname === '/profile' ? styles.active : ''
      }`}
      onClick={() => {
        setCurrentUniversity(dispatch, id);
      }}>
      <div className={styles.mainContainer}>
        <div className={styles.title}>
          <div className={styles.info}>
            <h3>{name}</h3>
            <p>{country.name}</p>
          </div>
          <div className={styles.actions}>
            <FavoriteStar clickHandler={clickHandler} favorite={isFavorite} />
            {location.pathname === '/profile' ? null : <ImNewTab />}
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
