import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectUserById } from '../../redux/usersSlice'
import { selectAllPosts } from '../../redux/postsSlice'

export const UserPage = ({ match }) => {
  const { userId } = match.params
  const user = useSelector((state) => selectUserById(state, userId))
  const userPosts = useSelector((state) => {
    const allPosts = selectAllPosts(state)
    return allPosts.filter((post) => post.user === userId)
  })

  const postTitles = userPosts.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <section>
      <h2>{user.name}</h2>
      <ul>{postTitles}</ul>
    </section>
  )
}
