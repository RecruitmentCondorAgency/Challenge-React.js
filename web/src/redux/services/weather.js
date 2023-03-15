import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.WEATHER_API,
  }),
  tagTypes: ['Weather'],
  endpoints: (builder) => ({
    fetchWeather: builder.query({
      query(arg = { params: {} }) {
        return {
          url: `/bin/astro.php`,
          params: {
            ...arg.params,
            product: 'astro',
            unit: 'metric',
            output: 'json',
          },
        };
      },
    }),
  }),
});

export const { useLazyFetchWeatherQuery } = weatherApi;
