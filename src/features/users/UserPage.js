import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createSelector } from '@reduxjs/toolkit'

import { selectUserById } from '../../redux/usersSlice'
import { useGetPostsQuery } from '../../api/apiSlice'
import { selectPostsByUser } from '../../redux/postsSlice'

export const UserPage = ({ match }) => {
  const { userId } = match.params
  const user = useSelector((state) => selectUserById(state, userId))

  const userPosts = useSelector((state) => selectPostsByUser(state, userId))
  const selectPostsForUser = useMemo(() => {
    const emptyArray = []
    return createSelector(
      (res) => res.data,
      (res, userId) => userId,
      (data, userId) =>
        data?.filter((post) => post.user === userId) ?? emptyArray
    )
  }, [userId])

  // // we want to use the result from a cache so we do not pass a state but undefined
  const { postsForUser } = useGetPostsQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      postsForUser: selectPostsForUser(result, user.id),
    }),
  })
  const postTitles = postsForUser.map((post) => {
    const postId = post.id
    return (
      <li key={postId}>
        <Link to={`/posts/${postId}`}>{post.title}</Link>
      </li>
    )
  })

  return (
    <section>
      <h2>{user.name}</h2>
      <ul>{postTitles}</ul>
    </section>
  )
}
