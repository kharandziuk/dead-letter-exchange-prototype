const faker = require('faker')
const delay = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms)
})

const EXCHANGE_NAME = 'MainExchange'

require('amqplib').connect('amqp://localhost').then(async(connection) => {
    const channel = await connection.createChannel()
    const queue = 'hello'
    while(await delay(500).then(() => true)) {
      const msg = faker.lorem.sentence()
      console.log(" [x] Sent %s", msg);
      channel.publish(EXCHANGE_NAME, '',  Buffer.from(msg));
    }
})
