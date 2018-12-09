const { readFileSync } = require('fs')
const { basename, join } = require('path')
const { renderToNodeStream } = require('react-dom/server.js')

const environment = require('./environment.js')
const getServer = require('./server')
const loadResourcesToStore = require('./server/react/store')
const { serverSideApplication } = require('./dist/bundle.server.js')
const { client } = require('./dist/webpack-assets.json')

// @todo apka kliencka, dev mode
// @todo optimize webpack
// @todo environment variables from webpack, bez package.json
// @todo absolute path w node i react

const filename = basename(client.js)
const template = readFileSync('dist/index.html', 'utf8')
// @todo jak to wyladuje na cdn to bedzie problem:
const clientScript = readFileSync(join('dist', filename), 'utf8')
const { application, store } = serverSideApplication()

getServer(environment)
  .get('/favicon.ico', (_, response) => response
    .type('ico')
    .send(null)
  )
  .get(`/${filename}`, (_, response) => response
    .type('js')
    .send(clientScript)
  )
  .get('/', async (_, response) => {
    response
      .type('html')
      .set({
        'Link': `<${client.js}>; rel="fragment-script"`
      })
      .write(template)

    const htmlState = await loadResourcesToStore({
      store,
      name: environment.applicationName
    })

    response
      .write(htmlState)

    renderToNodeStream(application)
      .pipe(response)
  })
  .listen(environment.port)
