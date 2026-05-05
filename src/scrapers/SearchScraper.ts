import { chromium } from "playwright";
import { SearchResult } from "../types/searchResult.types";
import { CONFIG } from "../config/config";

export class SearchScraper {

  async run(): Promise<SearchResult[]> {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      locale: "en-US",
      timezoneId: "Europe/Berlin",
    });
    const page = await context.newPage();

    try {
      const query = encodeURIComponent(CONFIG.google.query);
      await page.goto(`https://www.startpage.com/search?q=${query}&with_date=w`, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
        });

      const results = await page.$$eval("div.result", (items) => {
        return items.map((item) => {
          const title = item.querySelector("h2.wgl-title")?.textContent;
          const link = item.querySelector("a.result-title")?.getAttribute("href");
          const snippet = item.querySelector("p.description")?.textContent;
          return { title, link, snippet };
        }).filter((item) => item.title && item.link && item.link.startsWith("http"));
      });

      console.log(`Search results count: ${results.length}`);

      return results.map((item) => ({
        title: item.title!,
        link: item.link!,
        snippet: item.snippet || "",
      }));

    } catch (err: any) {
      console.log("Search scraping error:", err.message);
      return [];

    } finally {
      await browser.close();
    }
  }
}