import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/fakeApi',
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Post'],
    }),
    getPost: builder.query({
      query: (postId) => `/posts/${postId}`,
    }),
    addPost: builder.mutation({
      query: (initialPost) => ({
        url: '/posts',
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['Post'],
    }),
  }),
})
// because we are using react integration, it automatically generates
// react hooks for every endpoint we define - we only hve to add use at the beginning and Query at the end
// like in Apollo Client :)
export const { useGetPostsQuery, useGetPostQuery, useAddPostMutation } =
  apiSlice
