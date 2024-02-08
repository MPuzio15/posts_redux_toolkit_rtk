import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { DateComponent } from './DateComponent'

import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params

  const post = useSelector((state) =>
    state.posts.find((post) => post.id.toString() === postId)
  )

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  } else {
    return (
      <section>
        <article className="post">
          <div className="row margin-top">
            <DateComponent timeStamp={post.date} />
            <PostAuthor userId={post.user} />
          </div>
          <h2>{post.title}</h2>
          <p className="post-content">{post.content}</p>
          <div className="row">
            <Link to={`/editPost/${postId}`} className={'button'}>
              Edit post
            </Link>
            <ReactionButtons post={post} />
          </div>
        </article>
      </section>
    )
  }
}
