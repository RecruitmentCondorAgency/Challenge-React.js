import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const countryApi = createApi({
  reducerPath: 'countryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.COUNTRY_API,
  }),
  tagTypes: ['Country'],
  endpoints: (builder) => ({
    fetchCountries: builder.query({
      query(arg = { params: {} }) {
        return {
          url: 'all',
          params: arg.params,
        };
      },
    }),
    fetchCountry: builder.query({
      query(arg = { params: {}, name: '' }) {
        const { params, name } = arg;
        return {
          url: `/name/${name}`,
          params: params,
        };
      },
    }),
  }),
});

export const { useFetchCountriesQuery, useLazyFetchCountryQuery } = countryApi;
