import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import axios from 'axios'

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post('/events', async (req, res) => {
  console.log('Event received', req.body.type)
  const { type, data } = req.body
  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved'

    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: { ...data, status }
    })
  }
  res.send()
})

app.listen(4004, () => {
  console.log('Moderation Listening on 4004')
})
