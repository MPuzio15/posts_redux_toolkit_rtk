import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postAdded } from '../../redux/postsSlice'

export const AddFormPost = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const users = useSelector((state) => state.users)

  const onTitleChange = (e) => setTitle(e.target.value)
  const onContentChange = (e) => setContent(e.target.value)
  const onAuthorChange = (e) => setUserId(e.target.value)

  const addPost = () => {
    if (title && content && userId) {
      dispatch(postAdded(title, content, userId))
      setTitle('')
      setContent('')
      setUserId('')
    }
  }

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

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
