import React from 'react'
import { Link } from 'react-router-dom'

import { DateComponent } from './DateComponent'
import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'
import { Spinner } from '../../components/Spinner'
import { useGetPostQuery } from '../../api/apiSlice'

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params

  const {
    data: post,
    isFetching,
    isSuccess,
    isLoading,
  } = useGetPostQuery(postId)

  let content

  if (isFetching || isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = (
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
    )
  }
  return <section>{content}</section>
}
