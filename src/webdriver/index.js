const webdriver = require('selenium-webdriver');
const driver = new webdriver.Builder().forBrowser('chrome').build();
require('./custom');

(async () => {
  await driver.get('https://one-weeb.herokuapp.com');
  await driver.sleep(15000);
  await driver.close();
})();

module.exports = driver;
