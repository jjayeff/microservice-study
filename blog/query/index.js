import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import axios from 'axios'

const app = express()
app.use(cors())
app.use(bodyParser.json())

const posts = {}

const handleEvent = ({ type, data }) => {
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
}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/events', (req, res) => {
  console.log('Event received', req.body.type)
  handleEvent(req.body)
  res.send({})
})

app.listen(4003, async () => {
  console.log('Query Listening on 4003')
  try {
    const res = await axios.get('http://event-bus-srv:4005/events')

    for (let event of res.data) {
      console.log('Processing event:', event.type)
      handleEvent(event)
    }
  } catch (error) {
    console.log(error.message)
  }
})
