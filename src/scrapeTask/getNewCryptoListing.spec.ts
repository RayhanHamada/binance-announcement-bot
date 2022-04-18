import { launch } from 'puppeteer';
import { testTimout } from '~src/testutils/constant';
import getNewCryptoListing from './getNewCryptoListing';

describe('scrapeTask/getNewCryptoListing', () => {
  jest.setTimeout(testTimout);

  test('should work properly', async () => {
    const browser = await launch();
    const page = await browser.newPage();

    const testFn = async () => await getNewCryptoListing(page);

    expect(testFn).not.toThrowError();
  });

  test('should return array', async () => {
    const browser = await launch();
    const page = await browser.newPage();

    const testFn = async () => await getNewCryptoListing(page);

    expect(Array.isArray(await testFn())).toBeTruthy();
    await browser.close();
  });
});
