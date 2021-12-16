import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'

const app = express()
app.use(bodyParser.json())

app.post('/events', (req, res) => {
  const event = req.body

  axios.post('http://localhost:4001/events', event) // posts
  axios.post('http://localhost:4002/events', event) // comments
  axios.post('http://localhost:4003/events', event) // query
  axios.post('http://localhost:4004/events', event) // moderation

  res.send({ status: 'Ok' })
})

app.listen(4005, () => {
  console.log('Event Listening on 4005')
})
