import React from 'react'

import { useAddReactionMutation } from '../../api/apiSlice'

const reactionEmogi = {
  thumbsUp: '👍',
  hooray: '🥳',
  raisingHand: '🙌',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

export const ReactionButtons = ({ post }) => {
  const [addReaction] = useAddReactionMutation()

  const reactionButtons = Object.entries(reactionEmogi).map(([name, emoji]) => {
    return (
      <button
        type="button"
        key={name}
        className="muted-button reaction-button"
        onClick={() => addReaction({ postId: post.id, reaction: name })}
      >
        {emoji} {post.reactions[name]}
      </button>
    )
  })
  return <div>{reactionButtons}</div>
}
