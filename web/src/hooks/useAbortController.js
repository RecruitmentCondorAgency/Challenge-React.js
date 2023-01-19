import { useEffect, useRef } from 'react';

const useAbortController = () => {
  const controllerRef = useRef(null);

  useEffect(() => {
    controllerRef.current = new AbortController();

    return () => controllerRef.current.abort();
  }, []);

  return controllerRef.current;
};

export default useAbortController;
