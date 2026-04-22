import { IndeedScraper } from "./scrapers/IndeedScraper";
import { saveToFile } from "./utils/fileUtils";

async function main() {
  const scraper = new IndeedScraper();
  const jobs = await scraper.run();
  saveToFile("jobs.json", jobs);
}

main();