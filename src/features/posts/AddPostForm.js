import React, {useState} from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import {postAdded} from './postsSlice'

export const AddFormPost = () => {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const dispatch = useDispatch();

	const onTitleChange = (e) => setTitle(e.target.value)
	const onContentChange = (e) => setContent(e.target.value)

	const addPost = () => {
		if (title && content) {
			const post = {
				id: nanoid(),
				title: title,
				content: content
			}
			dispatch(postAdded(post))
			setTitle('')
			setContent('')
		}
	}

	return (
		<section>
			<h2>
				Add a new post
			</h2>
			<form>
				<label htmlFor='postTitle'>Post Title: </label>
				<input type='text' id={'postTitle'} value={title} onChange={onTitleChange}/>
				<label htmlFor='postContent'>Content: </label>
				<textarea type='text' id='postContent' value={content} onChange={onContentChange} />
				<button type='button' onClick={addPost}>Save post</button>
			</form>
		</section>
	)
}