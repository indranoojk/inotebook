const connectToMongo = require('./db');
const express = require('express')

connectToMongo();
const app = express()
// Using port 5000 because our React app will be running on port 3000
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello Indra! We did it.')
})

app.use(express.json())

// available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})