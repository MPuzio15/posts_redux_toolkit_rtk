import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { PostAuthor } from './PostAuthor'
import { DateComponent } from './DateComponent'
import { ReactionButtons } from './ReactionButtons'

export const PostsList = () => {
  const posts = useSelector((state) => state.posts)

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))

  const renderPosts = orderedPosts.map((post) => {
    const postId = post.id
    return (
      <article className="post-excerpt" key={postId}>
        <div className="row">
          <div>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
          </div>
          <DateComponent timeStamp={post.date} />
        </div>
        <PostAuthor userId={post.user} />
        <div className="row">
          <Link to={`/posts/${postId}`} className="button">
            View
          </Link>

          <ReactionButtons post={post} />
        </div>
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
