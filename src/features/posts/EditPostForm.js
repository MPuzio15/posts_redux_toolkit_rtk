import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useEditPostMutation, useGetPostQuery } from '../../api/apiSlice'
import { Spinner } from '../../components/Spinner'

export const EditPostForm = ({ match }) => {
  const { postId } = match.params
  const {
    data: post,
    isLoading: isPostLoading,
    isFetching,
    isSuccess,
  } = useGetPostQuery(postId)
  const [updatePost, { isLoading }] = useEditPostMutation()

  const navigationHistory = useHistory()

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const onTitleChange = (e) => setTitle(e.target.value)
  const onContentChange = (e) => setContent(e.target.value)

  const editPost = async () => {
    if (title && content) {
      const editedPost = {
        id: post.id,
        title: title,
        content: content,
      }
      await updatePost(editedPost)
      navigationHistory.push(`/posts/${postId}`)
    }
  }

  let contentPage

  if (isFetching || isPostLoading) {
    contentPage = <Spinner text="Loading..." />
  } else if (isSuccess) {
    contentPage = (
      <>
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
          <button type="button" onClick={editPost} disabled={isLoading}>
            Save post
          </button>
        </form>
      </>
    )
  }
  return <section>{contentPage}</section>
}
