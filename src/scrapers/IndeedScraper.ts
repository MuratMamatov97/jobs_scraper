import { chromium } from "playwright";
import { IndeedPage } from "../pages/IndeedPage";
import { Job } from "../types/job.types";

export class IndeedScraper {

  async run(): Promise<Job[]> {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      locale: "de-DE",
      timezoneId: "Europe/Berlin",
      viewport: { width: 1920, height: 1080 },
    });
    const page = await context.newPage();
    const indeedPage = new IndeedPage(page);

    try {
      console.log("Opening Indeed...");
      await indeedPage.open();

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