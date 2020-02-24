const http = require('http')
const url = require('url')
const fs = require('fs')

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname
  const jsHeader = { 'Content-Type': 'application/javascript' }
  switch(pathname) {
    case '/public/bundle.js':
      res.writeHead(200, jsHeader)
      return fs.createReadStream('./public/bundle.js').pipe(res)
    default:
      res.writeHead(200, {
        'Content-Type': 'text/html',
        'Link': '<_HOST_:_PORT_/public/bundle.js>; rel="fragment-script"'
      })
      return res.end('')
  }
})

server.listen(_PORT_, () => {
  console.log('SPA Fragment Server started at 8081')
})
