import {
  deleteSingleEntry,
  getLongByShort,
  hasShortId,
  overrideSingleShort,
  saveNewToMap,
} from "../db/db";
import { createRandomNumbers } from "../util/random.utils";

export function createShortId(longUrl: string): string {
  let shortId: string;
  do {
    shortId = createRandomNumbers(6);
  } while (hasShortId(shortId));

  saveNewToMap(shortId, longUrl);

  return shortId;
}

export function getLongUrl(shortId: string): string {
  return getLongByShort(shortId);
}

export function deleteByShort(shortId: string): void {
  deleteSingleEntry(shortId);
}

export function updateByShort(shortId: string, newLong: string): void {
  overrideSingleShort(shortId, newLong);
}
