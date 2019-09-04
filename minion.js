var axon = require('axon');
var sock = axon.socket('rep');

sock.connect(21555);

sock.on('message', function(msg, reply) {
  reply(msg.split("").reverse().join(""))
})
