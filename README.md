# Jobs Scraper

A TypeScript-based job scraper that collects QA Engineer positions from Indeed and Google job boards, with Telegram notifications for new listings.

## Features

- Scrapes job listings from Indeed (title, company, location, link)
- Searches Google job boards every 15 minutes
- Sends Telegram notifications when new jobs are found

## Tech Stack

- TypeScript
- Playwright
- Google Custom Search API
- Telegram Bot API

  
## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Install Playwright browsers

```bash
npx playwright install chromium
```

### 3. Create `.env` file

TELEGRAM_BOT_TOKEN=your_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
GOOGLE_API_KEY=your_api_key_here
GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id_here

### 4. Run

```bash
npm start
```

## Environment Variables

| Variable | Description |
|---|---|
| `TELEGRAM_BOT_TOKEN` | Token from @BotFather |
| `TELEGRAM_CHAT_ID` | Your chat ID from @userinfobot |
| `GOOGLE_API_KEY` | Google Cloud API key |
| `GOOGLE_SEARCH_ENGINE_ID` | Programmable Search Engine ID |

## License

MIT
