
import { Page } from "playwright";
import { sleep } from "../utils/sleep";
import { CONFIG } from "../config/config";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: CONFIG.timeouts.pageLoad,
    });
  }

  async randomSleep(): Promise<void> {
    await sleep(CONFIG.timeouts.minSleep, CONFIG.timeouts.maxSleep);
  }

  async takeScreenshot(path: string): Promise<void> {
    await this.page.screenshot({ path, fullPage: true });
    console.log(`Screenshot saved to ${path}`);
  }
}