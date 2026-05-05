
import { BasePage } from "./BasePage";
import { CONFIG } from "../config/config";
import { Job } from "../types/job.types";

export class IndeedPage extends BasePage {

  async open(): Promise<void> {
  const { query, location } = CONFIG.search;
  const url = `${CONFIG.indeedUrl}/jobs?q=${query}&l=${location}&fromage=7`;
  await this.navigate(url);
  await this.randomSleep();
}

  async rejectCookies(): Promise<void> {
  try {
    await this.page.waitForSelector(CONFIG.selectors.cookieReject, { timeout: 5000 });
    await this.page.mouse.move(100, 100);
    await this.page.mouse.move(200, 200);
    await this.page.click(CONFIG.selectors.cookieReject);
    await this.randomSleep();
    console.log("Cookies rejected");
  } catch {
    console.log("Cookie banner not found, skipping");
  }
}

  async getJobs(): Promise<Job[]> {
    const { jobCard, title, company, location, link } = CONFIG.selectors;
    const indeedUrl = CONFIG.indeedUrl;

    const jobs = await this.page.$$eval(
      jobCard,
      (cards, selectors) => {
        return cards.map((card) => {
          const titleEl = card.querySelector(selectors.title)?.textContent;
          const companyEl = card.querySelector(selectors.company)?.textContent;
          const locationEl = card.querySelector(selectors.location)?.textContent;
          const linkEl = card.querySelector(selectors.link)?.getAttribute("href");

          return {
            title: titleEl?.trim(),
            company: companyEl?.trim(),
            location: locationEl?.trim(),
            link: linkEl ? selectors.indeedUrl + linkEl : undefined,
          };
        });
      },
      { title, company, location, link, indeedUrl }
    );

    return jobs;
  }
}