import { useSelector } from 'react-redux';
import { Card } from './Card';
import { UniversityCard } from './UniversityCard';
import { RootState } from '../store/store';
import { useQuery } from '@tanstack/react-query';
import { countryAPI, userAPI } from '../repository/api';
import { useUniversity } from '../hooks/useUniversity';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { University } from '../types/university';
import { WeatherIcon } from './WeatherIcon';

export const Profile = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const [selectedUniversity, setSelectedUniversity] =
    useState<University | null>(null);

  const { isFavorite, removeUniversity } = useUniversity();

  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => userAPI.getUser(user.id),
    initialData: user,
    enabled: user.id > 0,
  });

  const { data: countryData } = useQuery({
    queryKey: ['country', selectedUniversity?.alpha_two_code],
    queryFn: () =>
      countryAPI.getCountryInfo(selectedUniversity?.alpha_two_code),
    enabled: Boolean(selectedUniversity),
  });

  const { data: weatherInfo, isLoading: isLoadingWeather } = useQuery({
    queryKey: ['weather', countryData?.name.common],
    queryFn: () => {
      const [lat, long] = countryData?.latlng;
      return countryAPI.getWeatherInfo(long, lat);
    },
    enabled: !!countryData?.name.common,
  });

  const formater = new Intl.NumberFormat(undefined);

  return (
    <div className='mx-4 lg:flex mt-10 max-w-5xl lg:mx-auto'>
      <section className='mb-4 lg:w-full'>
        <h2 className='text-sky-500 font-bold text-3xl mb-4'>My favorites</h2>
        <div className='mx-4 pb-4 flex flex-col gap-3 overflow-y-auto max-h-[25vh] lg:max-h-[80vh]'>
          {isLoading && <p>Loading favorites universities...</p>}
          {!isLoading && data.id !== 0 && data?.universities.length === 0 && (
            <p>
              No favorites yet, <Link to='/search'>take a look</Link>
            </p>
          )}
          {data?.universities?.map((university, i) => (
            <button
              key={`ucard-${i}`}
              onClick={() => setSelectedUniversity(university)}
            >
              <UniversityCard
                title={university.name}
                country={university.country}
                domains={university.domains}
                favorite={isFavorite(university)}
                removeFavorite={() => removeUniversity(university)}
              />
            </button>
          ))}
        </div>
      </section>
      <section className='mb-4 lg:w-full'>
        <h2 className='text-sky-500 font-bold text-3xl mb-4'>
          Selected university
        </h2>
        {!selectedUniversity && (
          <p>Select a university from your favorites list</p>
        )}
        {selectedUniversity && countryData && (
          <Card element='article' className='flex flex-col gap-4'>
            <h3 className='text-black font-bold mb-4'>
              {selectedUniversity.name}
            </h3>
            <p className='mb-2'>
              Laborum voluptate duis sit fugiat. Voluptate minim ullamco nisi
              proident et laborum qui aute qui. Ut Lorem ipsum veniam commodo
              ullamco occaecat aliquip velit ipsum velit.
            </p>
            <p>
              Sit laborum laboris ea non elit ea et minim consequat. Laboris
              culpa ut minim id quis exercitation sint amet exercitation cillum
              proident tempor. Ea id consequat dolor laborum nulla veniam id
              deserunt cillum id ea cillum.
            </p>
            <p>
              Website:{' '}
              {selectedUniversity.web_pages.map((web) => (
                <a href={web} target='_blank' rel='noreferrer nofollow'>
                  {web}
                </a>
              ))}
            </p>
            <p>
              Location:{' '}
              <span className='text-sky-500'>
                {countryData?.name?.official}
              </span>
            </p>
            <p>
              Country's capital:{' '}
              {countryData?.capital.map((cap) => (
                <span className='text-sky-500'>{cap}</span>
              ))}
            </p>
            <p>
              Currency:{' '}
              {Object.values(countryData?.currencies).map((value) => (
                <span className='text-sky-500'>{`${value.name} (${value.symbol}) `}</span>
              ))}
            </p>
            <p>
              Language:{' '}
              {Object.values(countryData?.languages).map((value, i, array) => (
                <span className='text-sky-500'>
                  {`${value}${
                    array.length > 1 && i < array.length - 1 ? ', ' : ''
                  }`}
                </span>
              ))}
            </p>
            <p>Population: {formater.format(countryData?.population)}</p>
            <p className='text-semibold text-black'>Weather - two weeks</p>
            {isLoadingWeather && <p>Loading weather data...</p>}
            <div className='grid grid-cols-7'>
              {weatherInfo?.dataseries.map((ds) => (
                <WeatherIcon weatherType={ds.weather} />
              ))}
            </div>
          </Card>
        )}
      </section>
    </div>
  );
};
