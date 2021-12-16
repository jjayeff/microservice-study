import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CommentList = ({ postId }) => {
  const [comments, setConments] = useState([])

  const fetchComments = async () => {
    const res = await axios.get(`http://localhost:4002/posts/${postId}/comments`)

    setConments(res.data)
  }

  useEffect(() => {
    fetchComments()
  }, [])

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
