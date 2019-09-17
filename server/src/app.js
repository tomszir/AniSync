const fs = require('fs')
const path = require('path')
const cors = require('cors')
const chalk = require('chalk')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const config = require('./config')
const { sequelize } = require('./sequelize/index.js')

app.use(cors())
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

sequelize.sync({ force: config.ENV === 'development' }).then(() => {
  app.listen(config.port, () => {
    console.log(`${chalk.black.bgBlue(' INFO ')} The server has been started`)
    console.log(
      `
      - Running locally on: ${chalk.blue('http://localhost:' + config.port)}
      `
    )
  })
})
