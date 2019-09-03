const randomBoolean = () => Math.random() >= 0.5

const QUEUE_NAME = 'MainQueue'

require('amqplib').connect('amqp://localhost').then(async(connection) => {
    const channel = await connection.createChannel()
    const queue = 'hello'
    const msg = 'Hello world';
    channel.consume(QUEUE_NAME, function(msg) {
      if(randomBoolean()) {
        channel.ack(msg)
        console.log(" [x] Received %s and acknowledged", msg.content.toString());
      } else {
        channel.reject(msg, false)
        console.log(" [x] Received %s and rejected", msg.content.toString());
      }
    });
})
