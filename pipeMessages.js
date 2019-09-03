const DLQ_NAME = 'DeadLetterQueue'
const EXCHANGE_NAME = 'MainExchange'

require('amqplib').connect('amqp://localhost').then(async(connection) => {
    const channel = await connection.createChannel()
    channel.consume(DLQ_NAME, function(msg) {
        channel.publish(EXCHANGE_NAME, '',  Buffer.from(msg.content));
        channel.ack(msg)
    });
})
