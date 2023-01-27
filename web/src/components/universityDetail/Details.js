import { Link } from 'react-router-dom';
import { getFormattedCurrencies, getFormattedLanguages } from '../../utils/helpers';
import * as styles from './styles.module.css';
import useFetchCountry from '../../hooks/useFetchCountry';
import Loading from '../loading/Loading';
import { useContext } from 'react';
import { ProfileContext } from '../../lib/contexts/ProfileContext';

const Details = () => {
  const { selectedUniversity } = useContext(ProfileContext);
  const {
    details: countryDetails,
    isLoading,
    err
  } = useFetchCountry(selectedUniversity?.country?.name);

  if (!selectedUniversity) {
    return <h4>Select any university to see details</h4>;
  }

  const { description, name, website } = selectedUniversity;

  return err ? (
    <p>Has ocurred an error while fetching country details.</p>
  ) : isLoading ? (
    <Loading />
  ) : (
    <div className={styles.information}>
      <h4>{name}</h4>
      <p>{description}</p>
      <ul>
        <li>
          Website: <a href="#">{website}</a>
        </li>
        <li>
          Location:{' '}
          <a
            target="_blank"
            href={countryDetails?.maps?.googleMaps}
            className={styles.locationLink}>
            {countryDetails?.name?.common}
          </a>
        </li>
        {Array.isArray(countryDetails?.capital) && countryDetails?.capital.length > 0 ? (
          <li>
            Country:{' '}
            <Link
              to={`/search/country/${countryDetails?.name?.common}`}
              className={styles.locationLink}>
              Country&apos;s capital: {countryDetails?.capital[0]}
            </Link>
          </li>
        ) : null}
        <li>Currencies: {getFormattedCurrencies(countryDetails?.currencies)}</li>
        <li>Language: {getFormattedLanguages(countryDetails?.languages)}</li>
        <li>Population: {countryDetails?.population}</li>
      </ul>
    </div>
  );
};

export default Details;
