const express = require('express')
const cors = require('cors')

const app = express()

// var corOptions = {
//   origin: 'http:localhost:5000',
// }

// middleware
// app.use(cors(corOptions))

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
  )

// routers
const router = require('./routes/productRouter.js')
app.use('/api/products', router)

// static Images Folder
app.use('/Images', express.static('./Images'))

// testing API on Chrome
app.get('/', (req, res) => {
  res.json({ message: 'Hello from api' })
})

// port
const PORT = process.env.PORT || 5000

// server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
