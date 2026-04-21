import { chromium } from "playwright";

export async function scrapeJobs() {

  function sleep(ms: number) {
    return new Promise(r => setTimeout(r, ms));
  }

  const browser = await chromium.launch({
    headless: false,
  });

  const page = await browser.newPage();
  const baseUrl = "https://de.indeed.com";

  try {
    // open the page
    await page.goto(
      `${baseUrl}/jobs?q=QA+Engineer&l=Berlin`,
      { waitUntil: "domcontentloaded", timeout: 30000 }
    );

    // time for page to 
    await sleep(2000 + Math.random() * 3000);

    // human imitation pause
    await sleep(1000 + Math.random() * 2000);

    // debug screenshot
    await page.screenshot({ path: "test.png", fullPage: true });

    // reject all coockies
    await page.click('#onetrust-reject-all-handler');

    // human imitation pause
    await sleep(1000 + Math.random() * 2000);
    
    // vacancies collecting
    const jobs = await page.$$eval(".job_seen_beacon", (cards, baseUrl) => {
      return cards.map((card) => {
        const title = card.querySelector("h2")?.textContent;
        const company = card.querySelector("[data-testid='company-name']")?.textContent;
        const location = card.querySelector("[data-testid='text-location']")?.textContent; 
        const link = card.querySelector("a[href]")?.getAttribute("href");

        return {
          title: title?.trim(),
          company: company?.trim(),
          location: location?.trim(),
          link: baseUrl + link
        };
      });
    }, baseUrl);

    return jobs;

  } catch (err) {
    console.log("Error while scraping:", err);
    return [];
  } finally {
    await browser.close();
  }
}