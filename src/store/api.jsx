import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pb } from '../Maincom/auth.js'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dana.pockethost.io/',
    prepareHeaders: (headers) => {
      // Add any required headers here
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: () => {
        const user = Pb.authStore.model;
        return `users/${user.id}`;
      },
      transformResponse: (response) => response.data,
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `users/${Pb.authStore.model.id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    updateAvatar: builder.mutation({
      query: (formData) => ({
        url: `users/${Pb.authStore.model.id}`,
        method: 'PATCH',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    }),
  }),
});

export const { useFetchUserQuery, useUpdateUserMutation, useUpdateAvatarMutation } = userApi;
