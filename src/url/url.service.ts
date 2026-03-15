import {
  deleteSingleEntry,
  getLongByShort,
  overrideSingleShort,
  saveNewToMap,
} from "../db/db";
import { createRandomNumbers } from "../util/random.utils";

export function createShortUrl(longUrl: string = "bla"): string {
  const shortUrl = createRandomNumbers(6);
  saveNewToMap(shortUrl, longUrl);

  return shortUrl;
}

export function getLongUrl(shortUrl: string): string {
  return getLongByShort(shortUrl);
}

export function deleteByShort(shortId: string): boolean {
  return deleteSingleEntry(shortId);
}

export function updateByShort(shortId: string, newLong: string): void {
  overrideSingleShort(shortId, newLong);
}
