import * as fs from "fs";

export function saveToFile(filename: string, data: any[]): void {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  console.log(`Saved ${data.length} jobs to ${filename}`);
}