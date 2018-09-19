const renderStream = require('./render-stream.js')


module.exports = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html',
  })
  renderStream().pipe(res);
}
