import {createSlice} from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'

const initialState = [
	{id: 1, title: "First post!", content: "Bitcoin to the moon"},
	{id: 2, title: "Golden are the best!", content: "Golden are the best dogs in the whole world!"}
];

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		postAdded: {
			reducer: (state, action) => {
				state.push(action.payload)
			}, 
			prepare(title, content) {
				return {
					payload: {
						id: nanoid(),
						title, 
						content
					}
				}
			}
		},
		postUpdated: (state, action) => {
			const {id, title, content} = action.payload;
			const existingPost = state.find(post => post.id === id)
			if (existingPost) {
				existingPost.title = title;
				existingPost.content = content;
			}
		}
	}
});

export const {postAdded, postUpdated} = postsSlice.actions;
export default postsSlice.reducer;