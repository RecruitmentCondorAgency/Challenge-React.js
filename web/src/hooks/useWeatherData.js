import { useEffect, useState } from 'react';
import { fetchWeatherData } from '../lib/actions/weather';

export const useWeatherData = (latlng) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const data = await fetchWeatherData(latlng, (err) => setError(err));
      setIsLoading(false);
      console.info(data);
      setData(data);
    };

    if (latlng) fetch();
  }, [latlng]);

  return {
    data,
    isLoading,
    error
  };
};
