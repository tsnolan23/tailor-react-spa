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

// @todo pino tee api - pino.destination do obslugi strumieni

const template = readFileSync('dist/index.html', 'utf8')
const clientScript = readFileSync('dist/bundle.client.js', 'utf8')

getServer(environment)
  .get('/favicon.ico', (_, reply) => reply
    .type('image/x-icon')
    .send(null)
  )
  .get('/bundle.client.js', (_, reply) => reply
    .type('application/javascript')
    .send(clientScript)
  )
  .get('/', (_, reply) => {
    // reply.res.write(template)
    // renderer(compiled)
    //   .pipe(reply.res)

    reply.res.writeHead(200, {
      'Content-Type': 'text/html',
      // 'Link': `<bundle.server.js>; rel="fragment-script"`
    })

    reply.res.write(template)
    reply.res.end()
    // reply
    //   .type('text/html')
    // @todo co z cdn? moze ten link nie jest potrzebny, jesli sie to zrobi bezposrednio w index
      // @todo to nie dziala w tailorze wtf
    // @todo tailor potrzebuje absolutne linki
      // .header('link', `<bundle.client.js>; rel="fragment-script"`)
  })
  .listen(environment.port)
