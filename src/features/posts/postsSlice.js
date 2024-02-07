import {createSlice} from '@reduxjs/toolkit'

const initialState = [
	{id: 1, title: "First post!", content: "Bitcoin to the moon"},
	{id: 2, title: "Golden are the best!", content: "Golden are the best dogs in the whole world!"}
];

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		postAdded: (state, action) => {
			state.push(action.payload)
		}
	}
});

export const {postAdded} = postsSlice.actions;
export default postsSlice.reducer;