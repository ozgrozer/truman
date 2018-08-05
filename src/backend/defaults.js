const os = require('os')
const path = require('path')

const defaults = {
  name: 'truman',
  port: 1122,
  downloadPath: path.join(os.homedir(), 'Desktop', 'screenshot.jpg')
}

module.exports = defaults
