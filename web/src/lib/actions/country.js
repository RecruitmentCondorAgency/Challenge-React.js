import axios from 'axios';

export const fetchCountryByCode = async (country, cb) => {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${country}`, {
      headers: {
        Accept: 'application/json'
      },
      timeout: 5000
    });

    return response.data;
  } catch (error) {
    console.error(error);
    if (cb) cb(error);
  }
};
