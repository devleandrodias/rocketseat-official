import http from 'node:http'

const server = http.createServer((req, res) => {
  return res.end('Hello Ignite Up!')
})

server.listen(4000)