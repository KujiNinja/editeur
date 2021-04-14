import http from 'http'
import { app } from './app.js'
import path from 'path'

const port = process.env.PORT || 4000
const server = http.createServer(app)


app.get('*', (req,res) => {
  res.sendFile(path.resolve('../client/build/index.html'))// unrouting
})

server.listen(port, () => {
  console.log(`
  ***
  Server started at ${port} port
  ***
  `)
})
