import React from 'react'
import { useDispatch } from 'react-redux'

import { reactionAdded } from '../../redux/postsSlice'

const reactionEmogi = {
  thumbsUp: '👍',
  hooray: '🥳',
  raisingHand: '🙌',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

export const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch()

  const handleAddReaction = (name) =>
    dispatch(reactionAdded({ postId: post.id, reaction: name }))

  const reactionButtons = Object.entries(reactionEmogi).map(([name, emoji]) => {
    return (
      <button
        type="button"
        key={name}
        className="muted-button reaction-button"
        onClick={() => handleAddReaction(name)}
      >
        {emoji} {post.reactions[name]}
      </button>
    )
  })
  return <div>{reactionButtons}</div>
}
