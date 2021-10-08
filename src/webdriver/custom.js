const { WebDriver } = require('selenium-webdriver');

WebDriver.prototype.isElementPresented = async function (locator) {
  const collection = await this.findElements(locator);
  return collection.length > 0;
};
