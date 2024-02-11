import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './postsSlice'
import usersReducer from './usersSlice'
import notificationsReducer from './notificationsSlice'
import { apiSlice } from '../api/apiSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // we need to add a middleware for the apiSlice and get all the default middleware,
  // since that hooks up into the apiSlice
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})
