const amqplib = require('amqplib')

const DLX_NAME = 'DeadLetterExchange'
const DLQ_NAME = 'DeadLetterQueue'
const EXCHANGE_NAME = 'MainExchange'
const QUEUE_NAME = 'MainQueue'

const main = async () => {
  const connection = await (amqplib.connect('amqp://localhost'))
  const channel = await connection.createChannel()
  await channel.assertExchange(
    DLX_NAME,
    'topic',
    {
      durable: true,
      autoDelete: false,
    }
  )
  await channel.assertQueue(DLQ_NAME, {durable: true, autoDelete: false})
  await channel.bindQueue(DLQ_NAME, DLX_NAME, '#');
  await channel.assertExchange(EXCHANGE_NAME, 'fanout', {durable: true, autoDelete: false})
  await channel.assertQueue(QUEUE_NAME, {
    durable: true,
    autoDelete: false,
    arguments: {
      'x-dead-letter-exchange': 'DeadLetterExchange'
    }
  })
  await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, '#');
  setTimeout(function() {
    connection.close();
    process.exit(0)
  }, 500);
}
main()
