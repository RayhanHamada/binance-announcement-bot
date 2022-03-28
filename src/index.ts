import { launch } from 'puppeteer';
import getNewListing from './tasks/getNewListing';

(async () => {
  const browser = await launch();
  const page = await browser.newPage();

  await getNewListing(page);

  // await browser.close();
})();
