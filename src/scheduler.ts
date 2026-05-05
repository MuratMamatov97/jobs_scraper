import cron from "node-cron";
import { SearchScraper } from "./scrapers/SearchScraper";
import { TelegramService } from "./services/TelegramService";
import { IndeedScraper } from "./scrapers/IndeedScraper";
import { loadSeenLinks, saveSeenLinks } from "./utils/storage";
import { saveToFile } from "./utils/fileUtils";
import { CONFIG } from "./config/config";

async function checkJobs(): Promise<void> {
  console.log(`[${new Date().toISOString()}] Checking for new jobs...`);

  const searchScraper = new SearchScraper();
  const telegramService = new TelegramService();
  const indeedScraper = new IndeedScraper();
  const seenLinks = loadSeenLinks();

  try {
    const [searchResults, indeedJobs] = await Promise.all([
      searchScraper.run(),
      indeedScraper.run(),
    ]);

    saveToFile("jobs.json", indeedJobs);

    const newSearchJobs = searchResults.filter((job) => !seenLinks.has(job.link));
    const newIndeedJobs = indeedJobs.filter((job) => job.link && !seenLinks.has(job.link));

    console.log("New search jobs:", newSearchJobs.length);
    console.log("New Indeed jobs:", newIndeedJobs.length);

    if (newSearchJobs.length === 0) {
      console.log("No new search jobs found");
    } else {
      console.log(`Found ${newSearchJobs.length} new search jobs, sending to Telegram...`);
      await telegramService.sendNewGoogleJobs(newSearchJobs);
      newSearchJobs.forEach((job) => seenLinks.add(job.link));
    }

    if (newIndeedJobs.length === 0) {
      console.log("No new Indeed jobs found");
    } else {
      console.log(`Found ${newIndeedJobs.length} new Indeed jobs, sending to Telegram...`);
      await telegramService.sendNewIndeedJobs(newIndeedJobs);
      newIndeedJobs.forEach((job) => job.link && seenLinks.add(job.link));
    }

    saveSeenLinks(seenLinks);

  } catch (err) {
    console.log("Error during scheduled run:", err);
  }
}

export function startScheduler(): void {
  console.log("Scheduler started. Checking every 30 minutes...");

  checkJobs();

  cron.schedule(CONFIG.scheduler.interval, checkJobs);
}