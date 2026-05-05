import dotenv from "dotenv";
dotenv.config();

export const CONFIG = {
  indeedUrl: "https://de.indeed.com",

  search: {
    query: "QA Engineer",
    location: "Berlin",
  },

  selectors: {
    jobCard: ".job_seen_beacon",
    title: "h2",
    company: "[data-testid='company-name']",
    location: "[data-testid='text-location']",
    link: "a",
    cookieReject: "#onetrust-reject-all-handler",
  },

  timeouts: {
    pageLoad: 30000,
    minSleep: 2000,
    maxSleep: 3000,
  },

  google: {
    query: '(site:jobs.ashbyhq.com OR site:boards.greenhouse.io OR site:jobs.lever.co OR site:apply.workable.com OR site:jobs.smartrecruiters.com OR site:jobs.jobvite.com) "Germany" "QA"',
  },

  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN!,
    chatId: process.env.TELEGRAM_CHAT_ID!,
  },

  scheduler: {
    interval: "*/30 * * * *",
  },
} as const;