import React from 'react'

const CommentList = ({ comments }) => {
  const renderedComment = Object.values(comments).map(({ id, content }) => {
    return (
      <li key={id}>{content}</li>
    )
  })

  return (
    <ul>
      {renderedComment}
    </ul>
  )
}

export default CommentList
