const path = require('path')

const mainDir = path.join(__dirname, '..', '..');
const reportFileName = 'junitresults.xml'

module.exports = {
  mainDir,
  reportFileName
}