import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import {
  useFetchUniversitiesQuery,
  useLazyFetchUniversitiesQuery,
} from '../redux/services/university';
import { useLazyFetchCountryQuery } from '../redux/services/country';
import UniversityList from '../components/UniversityList';
import UniversityCard from '../components/UniversityCard';

const University = () => {
  const { slug } = useParams();
  const [universitiesList, setUniversitiesList] = useState([]);
  const [cardProps, setCardProps] = useState({ name: 'nicename' });
  const userUniversities = useSelector(
    (state) => state.userState.user.universities
  );
  const { data, isLoading, error } = useFetchUniversitiesQuery({
    params: { name: slug },
  });
  const [fetchUniversity] = useLazyFetchUniversitiesQuery();
  const [fetchCountry] = useLazyFetchCountryQuery();

  useEffect(async () => {
    if (data?.length !== 0) {
      try {
        const res = await fetchCountry({
          params: { fields: 'capital,currencies,population,languages' },
          name: data[0].country,
        });

        setCardProps(
          data.map(({ name, web_pages, alpha_two_code, country }) => ({
            name,
            webPages: web_pages,
            countryCode: alpha_two_code,
            country,
            capital: res.data[0].capital[0],
            currencies: Object.values(res.data[0].currencies),
            languages: Object.values(res.data[0].languages),
            population: res.data[0].population,
          }))[0]
        );
      } catch (error) {}
    }
  }, [data]);

  useEffect(async () => {
    const promises = userUniversities
      .filter((name) => !['', null].includes(name))
      .map((name) => fetchUniversity({ params: { name } }));

    try {
      const results = await Promise.all(promises);
      setUniversitiesList(
        results.map(({ data }) => ({
          name: data[0].name,
          webPages: data[0].web_pages,
          countryCode: data[0].alpha_two_code,
          country: data[0].country,
          uuid: data[0].uuid,
          isFavorite: true,
        }))
      );
    } catch (error) {}
  }, [userUniversities]);

  return (
    <Grid container spacing={3}>
      <Grid item sm={12} md={6}>
        <Typography sx={{ mb: 2 }} variant="h5">
          My Favorites
        </Typography>
        <UniversityList universities={universitiesList} />
      </Grid>
      <Grid item sm={12} md={6}>
        <Typography sx={{ mb: 2 }} variant="h5">
          Selected University
        </Typography>
        {isLoading ? (
          <CircularProgress color="inherit" size={30} />
        ) : (
          data.length !== 0 && <UniversityCard {...cardProps} />
        )}
      </Grid>
    </Grid>
  );
};

export default University;
