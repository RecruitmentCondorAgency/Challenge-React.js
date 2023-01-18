import UniversityList from '../../components/UniversityList';
import * as styles from './styles.module.css';

const Details = () => {
  const favorites = [
    {
      name: 'sdflskdf',
      country: 'ofdsgdfg9',
      description: 'osi9848sdjfasd'
    },
    {
      name: 'sdflskdf',
      country: 'ofdsgdfg9',
      description: 'osi9848sdjfasd'
    },
    {
      name: 'sdflskdf',
      country: 'ofdsgdfg9',
      description: 'osi9848sdjfasd'
    }
  ];
  return (
    <div className={styles.container}>
      <section className={styles.favorites}>
        <h1 className={styles.title}>My Favorites</h1>
        <UniversityList universities={favorites} />
      </section>
      <section className={styles.details}>
        <h1 className={styles.title}>Selected University</h1>
        <div className={styles.information}>
          <h4>University name</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, blanditiis. Qui perferendis
            sit nisi! Facilis possimus dolore non quasi aliquam minima aspernatur, natus earum.
            Autem voluptate unde animi dolorum iusto.
          </p>
          <ul>
            <li>
              Website: <a href="#">website.com</a>
            </li>
            <li>
              Location: <a href="#">Country, City</a>
            </li>
            <li>
              Country&apos;s capital: <a href="#"> City</a>
            </li>
            <li>Currency: Name (Symbol)</li>
            <li>Language: Name</li>
            <li>Population: 99999</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Details;
