import express from 'express'
import bodyParser from 'body-parser'
import { randomBytes } from 'crypto'
import cors from 'cors'
import axios from 'axios'

const app = express()
app.use(bodyParser.json())
app.use(cors())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex')
  const { content } = req.body

  const comments = commentsByPostId[req.params.id] || []
  comments.push({ id: commentId, content })

  commentsByPostId[req.params.id] = comments

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: { id: commentId, content, postId: req.params.id, status: 'pending' }
  })

  res.status(201).send(comments)
})

app.post('/events', async (req, res) => {
  console.log('Event received', req.body.type)

  const { type, data } = req.body

  if (type === 'CommentModerated') {
    const { id, postId, status } = data

    const comments = commentsByPostId[postId]

    const comment = comments.find(({ id: commentId }) => commentId === id)
    comment.status = status

    await axios.post('http://event-bus-srv:4005/events', { type: 'CommentUpdated', data })
  }

  res.send({})
})

app.listen(4002, () => {
  console.log('Comment Listening on 4002')
})
