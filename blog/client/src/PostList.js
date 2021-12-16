import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PostCreate = () => {
  const [posts, setPosts] = useState({})

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4001/posts')

    setPosts(res.data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const renderedPost = Object.values(posts).map(({ id, title }) => {
    return (
      <div
        className="card"
        style={{ width: '30%', marginBottom: '20px' }}
        key={id}
      >
        <div className="card-body">
          <h3>{title}</h3>
        </div>
      </div>
    )
  })

  return (
    <div className='d-flex flex-row flex-wrap justify-content-between'>
      {renderedPost}
    </div>
  )
}

export default PostCreate