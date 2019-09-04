const DLQ_NAME = 'DeadLetterQueue'
const EXCHANGE_NAME = 'MainExchange'

const delay = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms)
})


const delayWithRefresh = (ms) => {
  let flag = false
  const promise = () => delay(ms).then(() => {
    if (flag) {
      return
    } else {
      flag = true
      return promise()
    }
  })
  const refresh = () => {
    flag = false
  }
  return {
    timeout: promise(),
    refresh
  }
}



require('amqplib').connect('amqp://localhost').then(async(connection) => {
    const channel = await connection.createChannel()
    const dwr = delayWithRefresh(1000)
    channel.consume(DLQ_NAME, function(msg) {
        channel.publish(EXCHANGE_NAME, '',  Buffer.from(msg.content));
        channel.ack(msg)
        dwr.refresh()
    });
    dwr.timeout.then(() => process.exit(0))
})
