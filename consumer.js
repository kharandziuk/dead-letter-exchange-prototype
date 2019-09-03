require('amqplib').connect('amqp://localhost').then(async(connection) => {
    const channel = await connection.createChannel()
    const queue = 'hello'
    const msg = 'Hello world';
    channel.assertQueue(queue, { durable: false })
    channel.consume(queue, function(msg) {
       console.log(" [x] Received %s %s", msg.content.toString(), msg);
       channel.ack(msg)
    });
})
