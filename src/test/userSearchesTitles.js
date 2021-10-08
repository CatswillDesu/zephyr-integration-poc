const driver = require('../webdriver');
const { By, until } = require('selenium-webdriver');

describe('user searches titles.', () => {
  it('popup displays titles.', async () => {
    try {
      await driver.get('https://one-weeb.herokuapp.com');
      const pageTitle = await driver.getTitle();
      expect(pageTitle).toBe('One Weeb');

      const searchField = await driver.findElement(By.css('.search-field'));
      searchField.click();
      await driver.wait(
        until.elementLocated(By.css('.search-popup-container')),
        5000
      );
      const searchPopupContainer = await driver.findElement(
        By.css('.search-popup-container')
      );
      expect(await searchPopupContainer.isDisplayed).toBeTruthy();
      expect(await searchPopupContainer.getText()).toContain(
        "Eneter the title of anime you're looking for"
      );

      await searchField.sendKeys('ay');
      expect(await searchPopupContainer.getText()).toContain(
        "Eneter the title of anime you're looking for"
      );

      await searchField.clear();
      await searchField.sendKeys('JoJo');
      await driver.wait(until.elementsLocated(By.css('.popup-item')), 5000);
      const searchItems = await driver.findElements(By.css('.popup-item'));
      expect(await searchItems[0].isDisplayed()).toBeTruthy();
      expect(searchItems.length).toEqual(5);

      const closeButton = await driver.findElement(By.css('.clear-button'));
      await closeButton.click();
      expect(
        await driver.isElementPresented(By.css('.search-popup-container'))
      ).toBeTruthy();
    } finally {
      await driver.close();
    }
  });
});
