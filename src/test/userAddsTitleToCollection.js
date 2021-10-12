const driver = require('../webdriver');
const { By, until } = require('selenium-webdriver');

describe('User adds title to collection.', () => {
  it('Title being added to collection page', async () => {
    expect.setState({
      tmsLink: 'ZT-6',
      failed: false
    });

    const collectionPageUrl = 'https://one-weeb.herokuapp.com/collection';
    const comedyGenrePageUrl =
      'https://one-weeb.herokuapp.com/catalog/genres/comedy';
    try {
      await driver.get(collectionPageUrl);
      let pageBody = await driver.findElement(By.css('body'));
      expect(await pageBody.getText()).toContain(
        "There's no titles in your collection yet :("
      );

      await driver.get(comedyGenrePageUrl);
      await driver.wait(
        () => until.elementsLocated(By.css('.catalog-item')),
        5000
      );
      await driver.sleep(2000);
      const catalogItems = await driver.findElements(By.css('.catalog-item'));
      const actions = driver.actions({ async: true });
      await actions.move(catalogItems[0]).perform();
      const addToCollectionButton = await catalogItems[0].findElement(
        By.css('.to-collection-button')
      );
      await driver.sleep(5000);
      expect(await addToCollectionButton.isDisplayed()).toBeTruthy();
    } catch (e) {
      expect.setState({
        failed: true,
        errorMessage: e.message
      });
      throw e;
    } finally {
      driver.close();
    }
  });
});
