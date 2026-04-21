import * as fs from "fs";

export function saveToFile(data: any[]) {
  fs.writeFileSync(
    "jobs.json",
    JSON.stringify(data, null, 2)
  );

  console.log("Saved to jobs.json");
}