import http from 'node:http'

/**
 * HTTP (Hypertext Transfer Protocol)
 * 
 * - METHOD AND URL (GET /user)
 * - GET, POST, PUT, PATCH, DELETE
 * - Stateful X Stateless
 * - JSON (Javascript Object Notation)
 * - Headers (Request, Response) === Metadatas
 * - Http Status Code
 */

const users = []

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-Type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@gmail.com'
    })

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(4000)