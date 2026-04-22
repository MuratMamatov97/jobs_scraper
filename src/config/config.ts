export const CONFIG = {
  baseUrl: "https://de.indeed.com",

  search: {
    query: "QA Engineer",
    location: "Berlin",
  },

  selectors: {
    jobCard: ".job_seen_beacon",
    title: "h2",
    company: "[data-testid='company-name']",
    location: "[data-testid='text-location']",
    link: "a[href]",
    cookieReject: "#onetrust-reject-all-handler",
  },

  timeouts: {
    pageLoad: 30000,
    minSleep: 2000,
    maxSleep: 3000,
  },
} as const;