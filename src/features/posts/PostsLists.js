import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { PostAuthor } from './PostAuthor'
import { DateComponent } from './DateComponent'
import { ReactionButtons } from './ReactionButtons'
import { Spinner } from '../../components/Spinner'
import { useGetPostsQuery } from '../../api/apiSlice'
import classnames from 'classnames'

let PostExcerpts = ({ post }) => {
  return (
    <article className="post-excerpt" key={post.id}>
      <div className="row">
        <PostAuthor userId={post.user} />
        <DateComponent timeStamp={post.date} />
      </div>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <div className="row">
        <Link to={`/posts/${post.id}`} className="button muted-button">
          View
        </Link>
        <ReactionButtons post={post} />
      </div>
    </article>
  )
}

PostExcerpts = React.memo(PostExcerpts)

export const PostsList = () => {
  const {
    data: posts = [],
    isLoading,
    isSuccess,
    isError,
    error,
    isFetching,
  } = useGetPostsQuery()

  const sortedPosts = useMemo(() => {
    const newPosts = [...posts]
    let sortedPosts = newPosts.sort((a, b) => b.date.localeCompare(a.date))
    return sortedPosts
  }, [posts])

  let content

  if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    const renderedPosts = sortedPosts.map((post) => (
      <PostExcerpts key={post.id} post={post} />
    ))
    const containerClassname = classnames('post-container', {
      disabled: isFetching,
    })
    content = <div className={containerClassname}>{renderedPosts}</div>
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts: </h2>
      {content}
    </section>
  )
}
