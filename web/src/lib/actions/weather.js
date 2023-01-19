import axios from 'axios';

const WEATHER_PRODUCT = 'two';
const OUTPUT_TYPE = 'xml';

export const fetchWeatherData = async (latlng, cb) => {
  const params = new URLSearchParams();
  params.append('lon', latlng[1]);
  params.append('lat', latlng[0]);
  params.append('product', WEATHER_PRODUCT);
  params.append('output', OUTPUT_TYPE);
  const parser = new DOMParser();
  try {
    const response = await axios.get(`http://www.7timer.info/bin/api.pl?${params.toString()}`, {
      headers: {
        Accept: 'application/json'
      },
      timeout: 5000
    });
    const xmlDoc = parser.parseFromString(response.data, 'text/xml');
    return xmlDoc;
  } catch (error) {
    if (cb) cb(error);
    console.error(error);
  }
};
