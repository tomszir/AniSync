const fs = require('fs')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

fs.readdirSync(path.join(__dirname, 'routes'))
  .filter(
    (file) =>
      file.endsWith('.js') && !file.startsWith('__') && !file.startsWith('.')
  )
  .forEach((file) => {
    const routeName = file.replace('.js', '')
    const route = require(path.join(path.join(__dirname, 'routes'), file))

    app.use(`/${routeName}`, route)
  })

module.exports = app
