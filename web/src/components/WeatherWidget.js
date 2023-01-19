import React from 'react';
import { useWeatherData } from '../hooks/useWeatherData';
import Loading from './loading/Loading';

const WeatherWidget = ({ latlng }) => {
  const { data, isLoading, error } = useWeatherData(latlng);
  const weatherType = data
    ?.getElementsByTagName('product')[0]
    ?.getElementsByTagName('dataseries')[0]
    ?.getElementsByTagName('data')[0]
    ?.getElementsByTagName('weather')[0]?.innerHTML;

  return error ? (
    <p>An error has ocurred getting the weather data.</p>
  ) : isLoading ? (
    <Loading />
  ) : (
    <div>{weatherType}</div>
  );
};

export default WeatherWidget;
