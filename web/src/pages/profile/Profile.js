import { useContext } from 'react';
import UniversityList from '../../components/universityList/UniversityList';
import { AuthContext, useAuth } from '../../lib/contexts/AuthContext';
import { ProfileProvider } from '../../lib/contexts/ProfileContext';
import * as styles from './styles.module.css';
import Details from '../../components/universityDetail/Details';

const ProfilePage = () => {
  const { user } = useAuth();

  return user.universities.length > 0 ? (
    <ProfileProvider>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h1 className={styles.title}>My Favorites</h1>
          <h1 className={styles.title}>Selected University</h1>
          <section className={styles.favorites}>
            <UniversityList universities={user.universities} />
          </section>
          <section className={styles.details}>
            <Details />
          </section>
        </div>
      </div>
    </ProfileProvider>
  ) : (
    <h3>You don&apos;t have any favorites</h3>
  );
};

export default ProfilePage;
