const path = require('path')
const takeAScreenshot = require(path.join(__dirname, '..', 'function', 'takeAScreenshot'))

const download = (req, res) => {
  const result = {
    success: false
  }
  takeAScreenshot(req.body)
    .then((result) => {
      result.success = true
      res.json(result)
    })
    .catch((err) => {
      result.error = err
      res.json(result)
    })
}

module.exports = download
