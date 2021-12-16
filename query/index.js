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
  const { type, data } = req.body
  switch (type) {
    case 'PostCreated':
      const { id, title } = data
      posts[id] = { id, title, comments: [] }
      break
    case 'CommentCreated':
      const { id: commentId, content, postId } = data
      const post = posts[postId]
      post.comments.push({ id: commentId, content })
      break
    default:
      break
  }

  console.log('🚀 ~ file: index.js ~ line 10 ~ posts', posts)

  res.send()
})

app.listen(4003, () => {
  console.log('Query Listening on 4003')
})
