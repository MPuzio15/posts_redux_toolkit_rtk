import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { selectAllUsers } from '../../redux/usersSlice'
import { useAddPostMutation } from '../../api/apiSlice'

export const AddFormPost = () => {
  const [addNewPost, { isLoading }] = useAddPostMutation()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const users = useSelector(selectAllUsers)

  const onTitleChange = (e) => setTitle(e.target.value)
  const onContentChange = (e) => setContent(e.target.value)
  const onAuthorChange = (e) => setUserId(e.target.value)

  const canSave = [title, content, userId].every(Boolean) && !isLoading

  const addPost = async () => {
    if (canSave) {
      try {
        await addNewPost({
          title,
          content,
          user: userId,
        }).unwrap()
        setTitle('')
        setContent('')
        setUserId('')
      } catch (err) {
        console.error('Set post failed')
      }
    }
  }

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a new post</h2>
      <form>
        <label htmlFor="postTitle">Post Title: </label>
        <input
          type="text"
          id={'postTitle'}
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postContent">Content: </label>
        <textarea
          type="text"
          id="postContent"
          value={content}
          onChange={onContentChange}
        />
        <label htmlFor="postAuthor">Author: </label>
        <select id="postAuthor" value={userId} onChange={onAuthorChange}>
          <option value=""></option>
          {userOptions}
        </select>
        <button type="button" onClick={addPost} disabled={!canSave}>
          Save post
        </button>
      </form>
    </section>
  )
}
