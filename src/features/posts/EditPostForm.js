import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { postUpdated } from '../../redux/postsSlice'

export const EditPostForm = ({ match }) => {
  const { postId } = match.params
  const dispatch = useDispatch()
  const navigationHistory = useHistory()
  const post = useSelector((state) =>
    state.posts.find((post) => post.id.toString() === postId)
  )
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const onTitleChange = (e) => setTitle(e.target.value)
  const onContentChange = (e) => setContent(e.target.value)

  const editPost = () => {
    if (title && content) {
      const editedPost = {
        id: post.id,
        title: title,
        content: content,
      }
      dispatch(postUpdated(editedPost))
      setTitle('')
      setContent('')
      navigationHistory.push(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit the post</h2>
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
        <button type="button" onClick={editPost}>
          Save post
        </button>
      </form>
    </section>
  )
}
