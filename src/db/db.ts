import { UrlEntry } from "./db.types";
import { readFromFile, saveToFile } from "../util/file.util";

let urlMap = new Map<string, UrlEntry>();

export function saveNewToMap(shortUrl: string, longUrl: string) {
  urlMap.set(shortUrl, { longUrl: longUrl, createdAt: new Date() });
  saveToFile();
}

export function loadUrlMap(): void {
  console.log("Loading UrlMAp");
  readFromFile();
  console.log("UrlMap loaded successfully");
}

export function getLongByShort(shortUrl: string): string {
  const item = urlMap.get(shortUrl);

  if (!item) {
    throw new Error(`URL not found for shortID ${shortUrl}`);
  }
  return item.longUrl;
}

export function deleteSingleEntry(shortId: string): boolean {
  const deleted = urlMap.delete(shortId);
  if (deleted) {
    saveToFile();
    console.log(`deleted item with shortId ${shortId}`);
  }
  return deleted;
}

export function getUrlMap() {
  return urlMap;
}

export function overrideMap(newMap: Map<string, UrlEntry>): void {
  urlMap = newMap;
}

export function overrideSingleShort(shortId: string, newLong: string): void {
  if (urlMap.has(shortId)) {
    saveNewToMap(shortId, newLong);
  } else {
    console.log(`No entry with id ${shortId} found`);
  }
}
