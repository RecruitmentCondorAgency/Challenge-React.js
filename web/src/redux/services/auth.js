import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { login } from '../features/userSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.AUTH_API,
  }),
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query(data) {
        return {
          url: '/signup',
          method: 'POST',
          body: data,
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(login(data));
        } catch (error) {}
      },
    }),
    loginUser: builder.mutation({
      query(credentials) {
        return {
          url: '/login',
          method: 'POST',
          body: credentials,
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(login(data));
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginUserMutation, useSignupUserMutation } = authApi;
