const { readFileSync } = require('fs')
const { basename, join } = require('path')

const environment = require('./environment.js')
const getServer = require('./server')
const renderer = require('./server/react')
const compiled = require('./dist/bundle.server.js')
const { client } = require('./dist/webpack-assets.json')

// @todo store, czy jesli apka nie potrzebuje store to ladowac reacta wczesniej
// @todo apka kliencka, dev mode
// @todo optimize webpack
// @todo jak zakazac importu fragment-react do fragment-vue
// @todo react podpinanie sie
// @todo environment variables from webpack, bez package.json
// @todo store initial state name


const filename = basename(client.js)
const template = readFileSync('dist/index.html', 'utf8')
// @todo jak to wyladuje na cdn to bedzie problem:
const clientScript = readFileSync(join('dist', filename), 'utf8')

getServer(environment)
  .get('/favicon.ico', (_, response) => response
    .type('ico')
    .send(null)
  )
  .get(`/${filename}`, (_, response) => response
    .type('js')
    .send(clientScript)
  )
  .get('/', (_, response) => {
    response
      .type('html')
      .set({
        'Link': `<${client.js}>; rel="fragment-script"`
      })
      .write(template)

    renderer(compiled)
      .pipe(response)
  })
  .listen(environment.port)
