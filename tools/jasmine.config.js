const jasmineReporters = require('jasmine-reporters');
const fs = require('fs');
const path = require('path');

function clearReportFolder() {
  const reportsPath = path.join(__dirname, '..', 'dist', 'test-results');
  fs.readdirSync(reportsPath)
    .filter((f) => /[*.xml]$/.test(f))
    .forEach((f) => fs.unlinkSync(reportsPath + `\\${f}`));
};

beforeAll(clearReportFolder)

afterAll()

var junitReporter = new jasmineReporters.JUnitXmlReporter({
  savePath: './dist/test-results',
  consolidateAll: true,
});
jasmine.getEnv().addReporter(junitReporter);

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
