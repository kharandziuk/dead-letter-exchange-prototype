const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.get('/', (req, res) => {
  res.json({msg: 'hello world'})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
