import React, { useContext } from 'react';
import * as styles from './styles.module.css';
import { ImNewTab } from 'react-icons/im';
import { addToFavorite, removeFromFavorite } from '../../lib/actions/favorite';
import { AuthContext, useAuth } from '../../lib/contexts/AuthContext';
import { ProfileContext } from '../../lib/contexts/ProfileContext';
import useAbortController from '../../hooks/useAbortController';
import FavoriteStar from '../favoriteStar/FavoriteStar';
import { useLocation } from 'react-router-dom';
import getFavoriteAndActive from '../../utils/unversity';
import useLocalStorage from '../../hooks/useLocalStorage';

const UniversityItem = ({ id, name, description, country }) => {
  const location = useLocation();

  const { setSelectedUniversity, selectedUniversity } = useContext(ProfileContext);

  const { user, setUser } = useAuth();

  const { isFavorite, isActive } = getFavoriteAndActive(user, selectedUniversity, id);

  const clickHandler = async () => {
    const args = {
      university: {
        id,
        name,
        description,
        country
      },
      user,
      errorCb: (error) => alert(error.message)
    };
    let newUser;
    if (isFavorite) {
      newUser = await removeFromFavorite(args, isActive);
    } else {
      newUser = await addToFavorite(args);
    }
    setUser(newUser);
  };

  return (
    <li
      className={`${styles.university} ${
        isActive && location.pathname === '/profile' ? styles.active : ''
      }`}
      onClick={() => {
        setSelectedUniversity(user.universities.find((uni) => uni.id === id));
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
