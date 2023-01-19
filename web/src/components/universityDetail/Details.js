import { Link } from 'react-router-dom';
import { getFormattedCurrencies, getFormattedLanguages } from '../../utils/helpers';
import * as styles from './styles.module.css';
import useFetchCountry from '../../hooks/useFetchCountry';
import Loading from '../loading/Loading';

const Details = ({ description, name, website, country }) => {
  const { details: countryDetails, isLoading } = useFetchCountry(country);

  return isLoading ? (
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
          <a target="_blank" href={countryDetails?.maps?.googleMaps}>
            {countryDetails?.name?.common}
          </a>
        </li>
        {Array.isArray(countryDetails?.capital) && countryDetails?.capital.length > 0 ? (
          <li>
            Country:{' '}
            <Link to={`/search/country/${countryDetails?.name?.common}`}>
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
