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

export function getLongByShort(shortId: string): string {
  const entry = urlMap.get(shortId);

  if (!entry) {
    throw new Error(`URL not found for shortID ${shortId}`);
  }
  return entry.longUrl;
}

export function deleteSingleEntry(shortId: string): void {
  const wasDeleted = urlMap.delete(shortId);
  if (!wasDeleted) {
    throw new Error(`Short URL not found for ${shortId}`);
  }
  saveToFile();
  console.log(`deleted item with shortId ${shortId}`);
}

export function getUrlMap() {
  return urlMap;
}

export function overrideMap(newMap: Map<string, UrlEntry>): void {
  urlMap = newMap;
}

export function overrideSingleShort(shortId: string, newLong: string): void {
  if (!urlMap.has(shortId)) {
    throw new Error(`Short URL not found for ${shortId}`);
  }
  saveNewToMap(shortId, newLong);
}

export function hasShortId(shortId: string): boolean {
  return urlMap.has(shortId);
}
