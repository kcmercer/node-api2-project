// implement your server here
const express = require('express')
const server = express()
const postsRouter = require('./posts/posts-router')

server.use(express.json())

server.use('/api/posts', postsRouter)

server.use('*', (req, res) => {
  res.send('Server Running!')
})

module.exports = server
// require your posts router and connect it here
