const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const config = require('../config')

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

const database = {}

fs.readdirSync(path.join(__dirname, 'models'))
  .filter(
    (file) =>
      file.endsWith('.js') && !file.startsWith('__') && !file.startsWith('.')
  )
  .forEach((file) => {
    const model = sequelize.import(
      path.join(path.join(__dirname, 'models'), file)
    )
    database[model.name] = model
  })

Object.keys(database).forEach((modelName) => {
  if (database[modelName].associate) {
    database[modelName].associate(database)
  }
})

database.sequelize = sequelize
database.Sequelize = Sequelize

module.exports = database
