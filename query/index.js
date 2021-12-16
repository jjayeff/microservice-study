import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(bodyParser.json())

const posts = {}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/events', (req, res) => {
  console.log('Event received', req.body.type)
  const { type, data } = req.body
  if (type === 'PostCreated') {
    const { id, title, status: postStatus } = data
    posts[id] = { id, title, comments: [], status: postStatus }
  }
  if (type === 'CommentCreated') {
    const { id: commentId, content, postId, status: commentStatus } = data
    const post = posts[postId]
    post.comments.push({ id: commentId, content, status: commentStatus })
  }
  if (type === 'CommentUpdated') {
    const { id, postId, status, content } = data
    const comments = posts[postId].comments
    const comment = comments.find(({ id: commentId }) => commentId === id)
    comment.status = status
    comment.content = content
  }

  res.send({})
})

app.listen(4003, () => {
  console.log('Query Listening on 4003')
})
