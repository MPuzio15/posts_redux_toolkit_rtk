import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit'

import { apiSlice } from '../api/apiSlice'
import { client } from '../api/client'

// we do not sort anything so we just pass it like this
const usersAdapter = createEntityAdapter()

// we can inject endpoints into the code
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
    }),
  }),
})

export const { useGetUsersQuery } = extendedApiSlice

const initialState = usersAdapter.getInitialState()

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await client.get('/fakeApi/users')
  return res.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) =>
      usersAdapter.setAll(state, action.payload)
    )
  },
})

export default usersSlice.reducer

export const selectUsersResult = apiSlice.endpoints.getUsers.select()

const emptyUsers = []

export const selectAllUsers = createSelector(
  selectUsersResult,
  (usersResult) => usersResult?.data ?? emptyUsers
)

export const selectUserById = createSelector(
  selectAllUsers,
  (state, userId) => userId,
  (users, userId) => users.find((user) => user.id === userId)
)
