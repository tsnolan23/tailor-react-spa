const renderStream = require('./render-stream.js')
var consul = require('consul')({
  host: 'consul'
});
const { machineIdSync } = require('node-machine-id');
var ip = require("ip");


module.exports = (req, res) => {
  consul.agent.service.register({
    id: machineIdSync(),
    name: 'test2',
    address: ip.address(),
    port: 80
  }, (err, t) => {
    console.log(err);
    console.log(t);
  })


  res.writeHead(200, {
    'Content-Type': 'text/html'
  })

  renderStream().pipe(res);
}
