import axios from "axios";
import { CONFIG } from "../config/config";
import { SearchResult } from "../types/searchResult.types";
import { Job } from "../types/job.types";

export class TelegramService {

  private indeedUrl: string;

  constructor() {
    this.indeedUrl = `https://api.telegram.org/bot${CONFIG.telegram.botToken}`;
  }

  async sendMessage(text: string): Promise<void> {
    await axios.post(`${this.indeedUrl}/sendMessage`, {
      chat_id: CONFIG.telegram.chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  }

  async sendNewGoogleJobs(jobs: SearchResult[]): Promise<void> {
    const header = `🔔 <b>Found ${jobs.length} new QA jobs in Germany (Google)</b>\n\n`;
    const body = jobs.map((job, i) => {
      return `${i + 1}. <b>${job.title}</b>\n${job.snippet}\n<a href="${job.link}">Open →</a>`;
    }).join("\n\n");

    await this.sendMessage(header + body);
  }

  async sendNewIndeedJobs(jobs: Job[]): Promise<void> {
    const header = `🔔 <b>Found ${jobs.length} new QA jobs in Germany (Indeed)</b>\n\n`;
    const body = jobs.map((job, i) => {
      return `${i + 1}. <b>${job.title}</b>\n🏢 ${job.company}\n📍 ${job.location}\n<a href="${job.link}">Open →</a>`;
    }).join("\n\n");

    await this.sendMessage(header + body);
  }
}