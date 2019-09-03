A prototype which shows dead-letter-exchange pattern for RabbitMQ with node.js

# Installation
- `yarn`
- `docker-compose up`
- `node setupTopology.js`

# details
- file `setupTopology.js` creates a topology for our queues
- file `producer.js` publish some messages
- file `consumer.js` consumes messages and reject them in 50% of the cases. Rejected messages will be redirected to DeadLetterQueue

# run
- `node consumer.js` in one terminal window
- `node producer.js` in another terminal window
- open `http://localhost:15672/#/queues` (`guest/guest`) to ensure that everything works
