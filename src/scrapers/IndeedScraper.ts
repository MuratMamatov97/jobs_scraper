import { chromium } from "playwright";
import { IndeedPage } from "../pages/IndeedPage";
import { Job } from "../types/job.types";

export class IndeedScraper {

  async run(): Promise<Job[]> {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    const indeedPage = new IndeedPage(page);

    try {
      console.log("Opening Indeed...");
      await indeedPage.open();

      console.log("Taking screenshot...");
      await indeedPage.takeScreenshot("test.png");

      console.log("Rejecting cookies...");
      await indeedPage.rejectCookies();

      console.log("Scraping jobs...");
      const jobs = await indeedPage.getJobs();
      console.log(`Found ${jobs.length} jobs`);

      return jobs;

    } catch (err) {
      console.log("Error while scraping:", err);
      return [];

    } finally {
      await browser.close();
    }
  }
}