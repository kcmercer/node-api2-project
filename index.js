// require your server and launch it here
const server = require('./api/server.js')

const PORT = 9000

server.listen(PORT, () => {
  console.log('Server running on port ', PORT)
})