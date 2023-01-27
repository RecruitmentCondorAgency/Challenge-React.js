import { useEffect, useState } from 'react';
import { fetchData } from '../utils/helpers';
import FetchBuilder from '../utils/fetchBuilder';

const useFetchUser = (id) => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const controller = new AbortController();
    const fetch = async () => {
      const builder = new FetchBuilder('users');

      if (id) builder.setId(id);

      builder.setSignal(controller.signal);
      const user = await fetchData(builder, () => setError(error));
      setFavorites(user.universities);
    };

    fetch();

    return () => controller.abort();
  }, [id]);

  return {
    error,
    favorites
  };
};

export default useFetchUser;
