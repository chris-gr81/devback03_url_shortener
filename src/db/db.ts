import { UrlEntry } from "./db.types";

const urlMap = new Map<string, UrlEntry>();

export function saveNewToMap(shortUrl: string, longUrl: string) {
  urlMap.set(shortUrl, { longUrl: longUrl, createdAt: new Date() });
  console.log(urlMap);
}
