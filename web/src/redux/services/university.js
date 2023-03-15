import { v4 as uuidv4 } from 'uuid';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const universityApi = createApi({
  reducerPath: 'universityApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.UNIVERSITY_API,
  }),
  tagTypes: ['University'],
  endpoints: (builder) => ({
    fetchUniversities: builder.query({
      query(arg = { params: {} }) {
        return {
          url: `/search`,
          params: arg.params,
        };
      },
      transformResponse: (result) =>
        // when using query params the API returns duplicates in the response,
        // an uuid has been added to avoid problems in the rendering using react
        result.map((item) => ({
          ...item,
          uuid: uuidv4(),
        })),
    }),
  }),
});

export const { useLazyFetchUniversitiesQuery, useFetchUniversitiesQuery } =
  universityApi;
