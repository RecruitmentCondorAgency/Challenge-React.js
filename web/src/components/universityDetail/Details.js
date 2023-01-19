import { getFormattedCurrencies, getFormattedLanguages } from '../../utils/helpers';
import * as styles from './styles.module.css';

const Details = ({ description, name, website, country }) => {
  return (
    <div className={styles.information}>
      <h4>{name}</h4>
      <p>{description}</p>
      <ul>
        <li>
          Website: <a href="#">{website}</a>
        </li>
        <li>
          Location: <a href="#">{country.name}</a>
        </li>
        <li>
          Country&apos;s capital: <a href="#"> {country.capital}</a>
        </li>
        <li>Currencies: {getFormattedCurrencies(country.currencies)}</li>
        <li>Language: {getFormattedLanguages(country.languages)}</li>
        <li>Population: {country.population}</li>
      </ul>
    </div>
  );
};

export default Details;
