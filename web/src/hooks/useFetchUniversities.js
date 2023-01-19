import { useEffect, useState } from 'react';
import FetchBuilder from '../utils/fetchBuilder';
import { fetchData } from '../utils/helpers';

const useFetchUniversities = () => {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    const builder = new FetchBuilder('universities');
    const controller = new AbortController();
    builder.setSignal(controller.signal);
    builder.setParentRelations(['country']);
    const fetch = async () => {
      const universities = await fetchData(builder, () =>
        console.error('Error fetch universities')
      );
      setUniversities(universities);
    };

    fetch();

    return () => controller.abort();
  }, []);

  return universities;
};

export default useFetchUniversities;
