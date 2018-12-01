'use strict'

const http = require('http')
const Tailor = require('node-tailor')
const tailor = new Tailor({
  templatesPath: __dirname + '/templates'
})

const PORT = process.env.PORT || 8080

http
  .createServer((req, res) => {
    if (req.url === '/favicon.ico') {
      res.writeHead(200, { 'Content-Type': 'image/x-icon' })
      return res.end('')
    }

    req.headers['x-request-uri'] = req.url

    if (req.url === '/') {
      req.url = '/index'
    }

    tailor.requestHandler(req, res)
  })
  .listen(PORT, '0.0.0.0', function() {
    /* eslint-disable-next-line */
    console.log('Tailor server listening on port: ', PORT)
  })
