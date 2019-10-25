const chalk = require('chalk')

const config = require('./config')

const app = require('./app')
const sockets = require('./sockets/index')
const { sequelize } = require('./sequelize/index')

console.clear()

sequelize.sync({ force: config.ENV === 'development' }).then(() => {
  const server = app.listen(config.port, () => {
    console.log('')
    console.log(`  Server running on:`)
    console.log(`  - Environment: ${chalk.cyanBright(config.ENV)}`)
    console.log(
      `  - Local: ${chalk.cyan('http://localhost:')}${chalk.cyanBright(
        config.port
      )}${chalk.cyan('/')}`
    )
  })

  sockets.init(server)
})
