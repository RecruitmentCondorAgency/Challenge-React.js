import { useState } from 'react';

const useLocalStorage = (key, defaultValue) => {
  const [storedValue, setStoreValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      } else {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
      setStoreValue(newValue);
    } catch (error) {
      setStoreValue(newValue);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
