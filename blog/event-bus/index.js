import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'

const app = express()
app.use(bodyParser.json())

const events = []

app.post('/events', (req, res) => {
  console.log('Event received', req.body.type)
  const event = req.body

  events.push(event)

  axios.post('http://posts-clusterip-srv:4001/events', event) // posts
  axios.post('http://comments-srv:4002/events', event) // comments
  axios.post('http://query-srv:4003/events', event) // query
  axios.post('http://moderation-srv:4004/events', event) // moderation

  res.send({ status: 'Ok' })
})

app.get('/events', (req, res) => {
  res.send(events)
})

app.listen(4005, () => {
  console.log('Event Listening on 4005')
})
