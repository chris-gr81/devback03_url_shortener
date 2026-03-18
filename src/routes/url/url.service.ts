import {
  deleteSingleEntry,
  getLongByShort,
  hasShortId,
  overrideSingleShort,
  saveNewToMap,
} from "../../db/db";
import { SHORT_ID_LENGTH } from "../../util/constants";
import { createRandomNumbers } from "../../util/random.utils";

/**
 * Generates a unique short ID for a given long URL.
 * Ensures no collision by checking existing entries.
 *
 * @param longUrl - The original long URL
 * @returns A unique short identifier
 */
export function createShortId(longUrl: string): string {
  let shortId: string;
  do {
    shortId = createRandomNumbers(SHORT_ID_LENGTH);
  } while (hasShortId(shortId));

  saveNewToMap(shortId, longUrl);

  return shortId;
}

/**
 * Retrieves the long URL for a given short ID.
 *
 * @param shortId - The short identifier
 * @returns The corresponding long URL
 */
export function getLongUrl(shortId: string): string {
  return getLongByShort(shortId);
}

/**
 * Deletes a URL mapping by its short ID.
 *
 * @param shortId - The short identifier to delete
 */
export function deleteByShort(shortId: string): void {
  deleteSingleEntry(shortId);
}

/**
 * Updates an existing short URL mapping with a new long URL.
 *
 * @param shortId - The short identifier
 * @param newLong - The new long URL
 */
export function updateByShort(shortId: string, newLong: string): void {
  overrideSingleShort(shortId, newLong);
}
