const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const PORT = process.env.PORT || 8081

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

require('./policies/passport')
require('./routes')(app)

app.listen(PORT, () => {
     console.log(`Listening on PORT http://localhost:${PORT}`)
})