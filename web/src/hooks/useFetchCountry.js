import { useEffect, useState } from 'react';
import { fetchCountryByCode } from '../lib/actions/country';

const useFetchCountry = (name) => {
  const [details, setDetails] = useState();
  const [err, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      setError(null);
      setIsLoading(true);
      const details = await fetchCountryByCode(name, (err) => {
        setError(err);
      });
      setIsLoading(false);

      setDetails(Array.isArray(details) && details.length > 0 ? details[0] : undefined);
    };

    fetch();
  }, [name]);

  return {
    details,
    err,
    isLoading
  };
};

export default useFetchCountry;
