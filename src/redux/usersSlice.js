import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '0', name: 'Sarah Jeff' },
  { id: '1', name: 'Adam Sandler' },
  { id: '2', name: 'Jackie Chan' },
  { id: '3', name: 'Julia Roberts' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
})

export default usersSlice.reducer
