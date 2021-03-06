import express from 'express'
import bodyParser from 'body-parser'
import { randomBytes } from 'crypto'
import cors from 'cors'
import axios from 'axios'

const app = express()
app.use(cors())
app.use(bodyParser.json())

const posts = {}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex')
  const { title } = req.body

  posts[id] = { id, title }

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'PostCreated',
    data: { id, title, status: 'pending' }
  })

  res.status(201).send(posts[id])
})

app.post('/events', (req, res) => {
  console.log('Event received', req.body.type)

  res.send()
})

app.listen(4001, () => {
  console.log('Post Listening on 4001')
})
