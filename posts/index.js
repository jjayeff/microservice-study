import express from 'express'
import bodyParser from 'body-parser'
import { randomBytes } from 'crypto'

const app = express()
app.use(bodyParser.json())

const posts = {}

app.get('/post', (req, res) => {
  res.send(posts)
})

app.post('/post', (req, res) => {
  const id = randomBytes(4).toString('hex')
  const { title } = req.body

  posts[id] = { id, title }

  res.status(201).send(posts[id])
})

app.listen(6000, () => {
  console.log('Post Listening on 6000')
})
