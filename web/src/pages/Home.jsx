import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

import { useUpdateUserMutation } from '../redux/services/user';
import { useFetchCountriesQuery } from '../redux/services/country';
import { useLazyFetchUniversitiesQuery } from '../redux/services/university';
import { useLazyFetchWeatherQuery } from '../redux/services/weather';
import { PAGE_SIZE, PRECIPITATION_TYPE_MAP } from '../constants';
import Table from '../components/Table';
import AutocompleteInput from '../components/AutocompleteInput';
import UniversityList from '../components/UniversityList';

const enrichUniversities = (universities, userUniversities) =>
  universities.map(({ name, web_pages, alpha_two_code, country, uuid }) => ({
    name,
    uuid,
    webPages: web_pages,
    countryCode: alpha_two_code,
    country,
    isFavorite: userUniversities.includes(name),
  }));

const weatherTableDataInitialState = {
  cells: ['Hours'],
  rows: [
    { name: 'Precipitation', data: [] },
    { name: 'Temp °C', data: [] },
  ],
};

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userState);
  const [universitiesLoading, setUniversitiesLoading] = useState(false);
  const [universitiesList, setUniversitiesList] = useState([]);
  const [universitiesOptions, setUniversitiesOptions] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = React.useState(1);
  const [weatherTableData, setWeatherTableData] = useState(
    weatherTableDataInitialState
  );
  const [capital, setCapital] = useState('');
  const {
    data: countries,
    isLoading: countriesLoading,
    error: countriesError,
  } = useFetchCountriesQuery({
    params: { fields: 'name,capital,capitalInfo' },
  });
  const [fetchWeather] = useLazyFetchWeatherQuery();
  const [fetchUnivertities, { data: universities, error: universitiesError }] =
    useLazyFetchUniversitiesQuery();
  const [updateUser, { isLoading, isSuccess, error, isError }] =
    useUpdateUserMutation();

  useEffect(() => {
    if (universities)
      setUniversitiesList(
        enrichUniversities(universities, user.universities).slice(
          (page - 1) * PAGE_SIZE,
          page * PAGE_SIZE
        )
      );
  }, [user.universities, universities, page]);

  useEffect(() => {
    if (universities)
      setUniversitiesOptions(
        enrichUniversities(universities, user.universities)
      );
  }, [user.universities, universities]);

  const handleChangeCountry = async (e, item) => {
    if (item != null) {
      try {
        const [lat, lon] = item.capitalInfo.latlng;
        setUniversitiesLoading(true);
        let [universitiesData, weatherData] = await Promise.all([
          fetchUnivertities({
            params: { country: item.name.official },
          }),
          fetchWeather({ params: { lon, lat } }),
        ]);
        setCapital(item.capital[0]);
        setWeatherTableData(
          weatherData.data.dataseries.reduce(
            (acumulator, { timepoint, prec_type, temp2m }) => {
              acumulator.cells.push(timepoint);
              acumulator.rows[0].data.push(PRECIPITATION_TYPE_MAP[prec_type]);
              acumulator.rows[1].data.push(temp2m);
              return acumulator;
            },
            structuredClone(weatherTableDataInitialState)
          )
        );

        if (universitiesData.data.length === 0) {
          universitiesData = await fetchUnivertities({
            params: { country: item.name.common },
          });
        }
        setPageCount(Math.ceil(universitiesData.data.length / PAGE_SIZE));
      } catch (error) {
        console.error(error);
      }
      setUniversitiesLoading(false);
    }
  };

  const handleChangeUniversity = (e, item) => {
    navigate(`/university/${item.name}`);
  };

  const handleChangePage = (e, value) => {
    setPage(value);
  };

  const handleFavoriteClick = (name) => {
    let universities = [];
    if (user.universities.includes(name)) {
      universities = user.universities.filter((item) => item !== name);
    } else {
      universities = [...user.universities, name];
    }
    updateUser({ id: user.id, body: { universities } });
  };

  return (
    <Stack spacing={2}>
      {capital !== '' && (
        <React.Fragment>
          <Typography>Weather in {capital}</Typography>
          <Table {...weatherTableData} />
        </React.Fragment>
      )}
      <Grid container spacing={2}>
        <Grid item sm={12} md={4}>
          <AutocompleteInput
            options={countries}
            label="Country"
            isOptionEqualToValue={(option, value) =>
              option.name.official === value.name.official
            }
            getOptionLabel={(option) => option.name.common}
            loading={countriesLoading}
            onChange={handleChangeCountry}
          />
        </Grid>
        <Grid item sm={12} md={8}>
          {/* TODO: virtualization and replace anonymous func for performance */}
          <AutocompleteInput
            options={universitiesOptions}
            label="University"
            loading={universitiesLoading}
            isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
            getOptionLabel={(option) => option.name}
            renderOption={({ onClick, ...props }, option) => (
              <ListItem
                {...props}
                key={option.uuid}
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                {React.cloneElement(
                  option.isFavorite ? <StarIcon /> : <StarOutlineIcon />,
                  {
                    sx: { mr: 1 },
                    onClick: () => handleFavoriteClick(option.name),
                  }
                )}
                <Typography onClick={onClick}>{option.name}</Typography>
              </ListItem>
            )}
            onChange={handleChangeUniversity}
          />
        </Grid>
      </Grid>
      {universitiesList.length !== 0 && (
        <React.Fragment>
          <UniversityList universities={universitiesList} />
          <Pagination
            sx={{ alignSelf: 'center' }}
            count={pageCount}
            showFirstButton
            showLastButton
            page={page}
            onChange={handleChangePage}
          />
        </React.Fragment>
      )}
    </Stack>
  );
};

export default Home;
