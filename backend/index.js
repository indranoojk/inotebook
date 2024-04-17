const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();
const app = express()
// Using port 5000 because our React app will be running on port 3000
const port = 5000;

app.use(cors())
app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('Hello Indra! We did it.')
// })


// available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})