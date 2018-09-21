const renderStream = require('./render-stream.js')
var consul = require("consul")({
  host: 'consul'
});
const { machineIdSync } = require('node-machine-id');
var ip = require("ip");
consul.agent.service.register({
  id: machineIdSync(),
  name: 'test2',
  address: ip.address(),
  port: 80
}, (err, t) => {
  console.log(err);
  console.log(t);
})

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
  // const payload = {
  //   Node: machineIdSync(),
  //   Address: ip.address(),
  //   ServiceName: 'Vue-http',
  //   ServiceAddress: 'fragment-vue-http',
  //   ServicePort: 80
  // };
  //
  // axios.put('http://consul:8500/v1/catalog/register', {...payload})
  //   .then((response) => {
  //     console.log(response.data);
  //   })
  //   .catch(console.log)

  res.writeHead(200, {
    'Content-Type': 'text/html'
  })

  renderStream().pipe(res);
}
