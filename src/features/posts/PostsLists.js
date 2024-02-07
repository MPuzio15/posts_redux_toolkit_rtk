import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

export const PostsList = () => {
  const posts = useSelector(state => state.posts);

  const renderPosts = posts.map(post => {
    const postId = post.id
    return (
      <article className="post-excerpt" key={postId}>
        <h3>{post.title}</h3>
        <p>{post.content.substring(0, 100)}</p>
        <Link to={`/posts/${postId}`} className='button muted-button'>View</Link>
      </article>
    )
  })
  
  return (
    <section className="posts-list">
      <h2>Posts: </h2>
      {renderPosts}
    </section>
  )
}
