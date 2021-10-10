const path = require('path')
const fs = require('fs')
const { xml2js } = require('xml-js');

const { mainDir, reportFileName } = require('./index')

const xmlPath = path.join(mainDir, 'dist', 'test-results', reportFileName)
const xml = fs.readFileSync(xmlPath);

function formatTestcase(tcase) {
  return {
    suitName: tcase._attributes.classname,
    caseName: tcase._attributes.name,
    time: tcase._attributes.time,
    getErrorStack() {
      if (!(failure in tcase)) throw new Error("No failures in this testcase.")
      return tcase.failure._cdata
    }
  }
}

function formatTestsuite(tsuite) {
  return {
    getTmsLink() {
      const tmsLinkTextPart = this.name.slice(this.name.indexOf('TMS-LINK'))
      return tmsLinkTextPart.slice(tmsLinkTextPart.indexOf('=') + 1)
    },
    ...tsuite._attributes
  }
}

function getRawReport() {
  return xml2js(xml, {compact: true, spaces: 4})
}

function getAllTestuites(raw) {
  const tsuites = getRawReport().testsuites.testsuite
  if (raw) {
    return tsuites
  }
  return tsuites.map(formatTestsuite)
}

function getTestcases(tsuite, raw) {
  const tcases = tsuite.map(suite => suite.testcase)
  if (raw) {
    return tcases
  }
  return tcases.map(formatTestcase)
}

module.exports = { 
  getRawReport,
  getAllTestuites,
  getTestcases
}