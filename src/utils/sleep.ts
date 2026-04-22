export function sleep(min: number, max: number): Promise<void> {
  const ms = min + Math.random() * max;
  return new Promise((r) => setTimeout(r, ms));
}