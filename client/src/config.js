const fs = require('fs')
const path = require('path')

const ENV = process.env.NODE_ENV || 'DEVELOPMENT'
const DEV_CONFIG_PATH = path.join(__dirname, './config.dev.js')

const config = {
  PRODUCTION: {
    baseURL: ''
  },
  DEVELOPMENT: fs.existsSync(DEV_CONFIG_PATH) ? require(DEV_CONFIG_PATH) : {}
}

module.exports = Object.assign({}, config[ENV], { ENV })
