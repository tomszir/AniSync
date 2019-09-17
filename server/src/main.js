const chalk = require('chalk')
const config = require('./config')

console.log(
  `${chalk.black.bgBlue(' INFO ')} Running in ${chalk.blue(config.ENV)} mode\n`
)

if (config.ENV === 'DEVELOPMENT' && Object.keys(config).length === 1) {
  console.log(
    `${chalk.black.bgYellow(' WARN ')} No ${chalk.blue(
      'DEVELOPMENT'
    )} config file exists:`
  )
  console.log(
    `
    - Please create one at this location: ${chalk.blue('./src/config.dev.js')}
    - Or switch to ${chalk.blue('PRODUCTION')} mode, by using: ${chalk.blue(
      'npm run prod'
    )}
    `
  )
} else {
  require('./app')
}
