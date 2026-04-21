import { scrapeJobs } from "./scrape";
import { saveToFile } from "./save";

async function run() {
  console.log("Scraping...");

  const jobs = await scrapeJobs();

  console.log("Found:", jobs.length);

  saveToFile(jobs);
}

run();