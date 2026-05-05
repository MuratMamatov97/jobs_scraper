# Jobs Scraper

Automated job scraper that searches for QA Engineer positions in Germany and sends Telegram notifications for new listings.

## Features

- Scrapes QA jobs from **Indeed** every 30 minutes
- Searches for QA jobs on **Startpage** (greenhouse.io, lever.co, ashbyhq.com, smartrecruiters.com, workable.com, jobvite.com)
- Sends **Telegram notifications** for new jobs
- Deduplicates results — never sends the same job twice
- Saves Indeed results to `jobs.json`

## Prerequisites

- Node.js 18+
- npm

## Installation

```bash
git clone https://github.com/MuratMamatov97/jobs_scraper.git
cd jobs_scraper
npm install
npx playwright install chromium
```

## Configuration

Create a `.env` file in the root directory:

```
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
```

### How to get Telegram credentials

**Bot token:**
1. Open Telegram → find **@BotFather**
2. Send `/newbot`
3. Follow the steps — copy the token

**Chat ID:**
1. Open Telegram → find **@userinfobot**
2. Send `/start`
3. Copy the ID it sends back

## Usage

```bash
npx ts-node src/index.ts
```

The scraper runs immediately on start, then every 30 minutes automatically.

## How It Works

1. **Scheduler** triggers every 30 minutes
2. **IndeedScraper** opens Indeed in a headless browser and collects job listings
3. **SearchScraper** searches Startpage for jobs on major job boards
4. New results are compared against `seen_jobs.json`
5. New jobs are sent to **Telegram**
6. Indeed results are saved to `jobs.json`
7. Seen links are saved to prevent duplicates

## Tech Stack

- **TypeScript**
- **Playwright** — browser automation
- **node-cron** — task scheduling
- **axios** — HTTP requests
- **dotenv** — environment variables

## Design Principles

- **POM** (Page Object Model) — all page interactions in dedicated classes
- **Single Responsibility** — each file has one purpose
- **OOP** — classes with methods instead of standalone functions
- **Config** — all selectors and URLs in one place
- **Interfaces** — full TypeScript typing