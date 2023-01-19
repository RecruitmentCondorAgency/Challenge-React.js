import { useParams } from 'react-router-dom';
import useFetchCountry from '../../hooks/useFetchCountry';
import * as styles from './styles.module.css';
import WeatherWidget from '../../components/WeatherWidget';
import Loading from '../../components/loading/Loading';

const CountryDetailsPage = () => {
  const { countryName } = useParams();

  const { details, err, isLoading } = useFetchCountry(countryName);

  return isLoading ? (
    <Loading />
  ) : !err ? (
    <div className={styles.wrapper}>
      <h1>{details?.name.common}</h1>
      <section className={styles.section}>
        <h4>Its capital is: {details?.capital[0]}</h4>
      </section>
      <section className={styles.section}>
        <p>
          It&apos;s located in continent of {details?.subregion} at latitude {details?.latlng[0]}{' '}
          and longitude {details?.latlng[1]}
        </p>
      </section>
      <section className={styles.weather}>
        <h4>Recent Weather information:</h4>
        <WeatherWidget latlng={details?.latlng} />
      </section>
    </div>
  ) : (
    <h3>Sorry, we could not fetch the data.</h3>
  );
};

export default CountryDetailsPage;
