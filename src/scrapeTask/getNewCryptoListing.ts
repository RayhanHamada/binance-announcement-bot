import { load } from 'cheerio';
import type { Page } from 'puppeteer';
import dayjs from '~/src/utils/dayjs';
import genSha256 from '~src/utils/genSHA256';

const pageLink =
  'https://www.binance.com/en/support/announcement/c-48?navId=48';

const elementXPath =
  '//*[@id="__APP"]/div/div/main/div[2]/div[2]/section/div[2]/div[1]';

export default async function getNewCryptoListing(page: Page) {
  await page.goto(pageLink);

  // get all list
  const els = await page.$x(elementXPath);

  // take only first level div
  const el = await els[0].$$(':scope > div');

  const htmlArr = await Promise.all(
    el.map(async (e) => await e.evaluate((e) => e.innerHTML))
  );

  // extract title, link, and date
  const extracts = htmlArr
    .map((e) => {
      const loaded = load(e);

      const link = `https://www.binance.com${loaded('a').attr('href')}`;
      const title = (loaded('a > div').contents()[0] as any).data as string;
      const textDate = loaded('a > div > h6').text();
      const date = dayjs(textDate, 'YYYY-MM-DD');

      return {
        link,
        title,
        date,
        hash: genSha256(title),
      };
    })

    /**
     * get only today's listing
     */
    .filter((listing) => listing.date.isAfter(dayjs().startOf('d')));

  return extracts;
}
