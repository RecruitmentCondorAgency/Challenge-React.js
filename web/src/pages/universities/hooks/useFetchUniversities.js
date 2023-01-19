import { useEffect, useState } from 'react';
import fetchUniversities from '../../../lib/actions/fetchUniversities';

const useFetchUniversities = () => {
  const [universities, setUniversities] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    const fetch = async () => {
      const universities = await fetchUniversities(null, controller);
      setUniversities(universities);
    };

    fetch();

    return () => controller.abort();
  }, []);

  return universities;
};

export default useFetchUniversities;
