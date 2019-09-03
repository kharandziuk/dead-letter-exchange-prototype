const faker = require('faker')
const delay = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms)
})
require('amqplib').connect('amqp://localhost').then(async(connection) => {
    const channel = await connection.createChannel()
    const queue = 'hello'
    channel.assertQueue(queue, { durable: false })
    while(await delay(500).then(() => true)) {
      const msg = faker.lorem.sentence()
      console.log(" [x] Sent %s", msg);
      channel.sendToQueue(queue, Buffer.from(msg));
    }
})
