import * as fs from "fs";

const STORAGE_FILE = "seen_jobs.json";

export function loadSeenLinks(): Set<string> {
  if (!fs.existsSync(STORAGE_FILE)) {
    return new Set();
  }

  const data = JSON.parse(fs.readFileSync(STORAGE_FILE, "utf-8"));
  return new Set(data);
}

export function saveSeenLinks(links: Set<string>): void {
  fs.writeFileSync(STORAGE_FILE, JSON.stringify([...links], null, 2));
}