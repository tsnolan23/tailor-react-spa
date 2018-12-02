const { readFileSync } = require('fs')

const environment = require('./environment.js')
const getServer = require('./server')
const renderer = require('./server/react')
const compiled = require('./dist/bundle.server.js')

// @todo store, czy jesli apka nie potrzebuje store to ladowac reacta wczesniej
// @todo apka kliencka, dev mode
// @todo optimize webpack
// @todo do strumienia trzeba dodac artefakty npkg

// @todo consul jak bedzie zwracac

const template = readFileSync('dist/index.html', 'utf8')
const clientScript = readFileSync('dist/bundle.client.js', 'utf8')

getServer(environment)
  .get('/favicon.ico', (_, response) => response
    .type('ico')
    .send(null)
  )
  .get('/bundle.client.js', (_, response) => response
    .type('js')
    .send(clientScript)
  )
  .get('/', (_, response) => {
    // @todo tailor potrzebuje absolutne linki
    // @todo jak developowac
    // @todo hashowane adresy

    response
      .type('html')
      .set({
        'Link': `<http://localhost:1321/bundle.client.js>; rel="fragment-script"`
      })
      .write(template)

    renderer(compiled)
      .pipe(response)
  })
  .listen(environment.port)
