import React from 'react'

const CommentList = ({ comments }) => {
  const renderedComment = Object.values(comments).map(({ id, content, status }) => {
    let newContent
    if (status === 'approved') newContent = content
    if (status === 'pending') newContent = 'This comment is await moderation.'
    if (status === 'rejected') newContent = 'This comment has been rejected'
    return (
      <li key={id}>{newContent}</li>
    )
  })

  return (
    <ul>
      {renderedComment}
    </ul>
  )
}

export default CommentList
