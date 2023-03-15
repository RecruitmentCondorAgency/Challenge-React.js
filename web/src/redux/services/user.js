import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';

import { logout, setUser } from '../features/userSlice';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.USER_API,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().userState.accessToken;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query(id) {
        return {
          url: `/${id}`,
        };
      },
      transformResponse: (result) => result.data,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser({ user: data }));
        } catch (error) {}
      },
    }),
    updateUser: builder.mutation({
      query(data) {
        return {
          url: `/users/${data.id}`,
          method: 'PATCH',
          body: data.body,
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser({ user: data }));
        } catch (error) {
          if (error.error.status === 401) {
            toast.error('Session expired, please login.');
            dispatch(logout());
          }
        }
      },
    }),
  }),
});

export const { useFetchUserQuery, useUpdateUserMutation } = userApi;
