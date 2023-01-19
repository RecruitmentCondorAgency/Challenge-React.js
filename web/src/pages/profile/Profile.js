import { useContext } from 'react';
import UniversityList from '../../components/universityList/UniversityList';
import { AuthContext } from '../../lib/contexts/AuthContext';
import * as styles from './styles.module.css';
import Details from '../../components/universityDetail/Details';

const ProfilePage = () => {
  const {
    state: { user, university }
  } = useContext(AuthContext);

  return user.universities.length > 0 ? (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>My Favorites</h1>
        <h1 className={styles.title}>Selected University</h1>
        <section className={styles.favorites}>
          <UniversityList universities={user.universities} />
        </section>
        <section className={styles.details}>
          {university ? <Details {...university} /> : null}
        </section>
      </div>
    </div>
  ) : (
    <h3>You don&apos;t have any favorites</h3>
  );
};

export default ProfilePage;
