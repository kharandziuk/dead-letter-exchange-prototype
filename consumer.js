const { fork } = require('child_process')
const randomBoolean = () => Math.random() >= 0.5
const crypto = require("crypto");
const getId = () => crypto.randomBytes(16).toString("hex")

const QUEUE_NAME = 'MainQueue'
const minion = fork('./minion')

var axon = require('axon');
var sock = axon.socket('req');

console.log(sock.bind(21555))

require('amqplib').connect('amqp://localhost').then(async(connection) => {
    const channel = await connection.createChannel()
    channel.consume(QUEUE_NAME, function(msg) {
      sock.send(msg.content.toString(), function(res){
        console.log(res)
        channel.ack(msg)
      });
    });
})

