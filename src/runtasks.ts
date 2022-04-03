import { launch } from 'puppeteer';
import getNewListing from './tasks/getNewListing';

const runTasks = async () => {
  /**
   * launch headless browser
   */
  const browser = await launch();
  const page = await browser.newPage();

  /**
   * gather announcements here
   */
  const newListings = await getNewListing(page);

  /**
   * TODO: delisting,
   */

  /**
   * close browser when done
   */
  await browser.close();

  /**
   * TODO: broadcast data to every subscribing guilds and channels
   */
};

export default runTasks;
