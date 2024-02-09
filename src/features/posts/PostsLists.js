import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { PostAuthor } from './PostAuthor'
import { DateComponent } from './DateComponent'
import { ReactionButtons } from './ReactionButtons'
import {
  selectAllPosts,
  fetchPosts,
  selectPostIds,
  selectPostById,
} from '../../redux/postsSlice'
import { Spinner } from '../../components/Spinner'

let PostExcerpts = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId))
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
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)
  const orderedPostsIds = useSelector(selectPostIds)

  const postStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'success') {
    content = orderedPostsIds.map((postId) => (
      <PostExcerpts key={postId} postId={postId} />
    ))
  } else if (postStatus === 'error') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts: </h2>
      {content}
    </section>
  )
}
