import { UrlEntry } from "./db.types";
import { readFromFile, saveToFile } from "../util/file.util";
import { NotFoundError } from "../error/NotFoundError";
import { jsonToMap, mapToJson } from "../util/transform.utils";

/**
 * In-memory storage for all URL mappings.
 * Key = short URL, Value = UrlEntry object
 */
let urlMap = new Map<string, UrlEntry>();

/**
 * Saves a new short → long URL mapping.
 * Also persists the updated map to file.
 *
 * @param shortUrl - The generated short identifier
 * @param longUrl - The original long URL
 */
export function saveNewToMap(shortUrl: string, longUrl: string) {
  urlMap.set(shortUrl, { longUrl: longUrl, createdAt: new Date() });
  const converted = mapToJson(urlMap);
  saveToFile(converted);
}

/**
 * Loads the URL map from file and overrides the in-memory map.
 */
export function loadUrlMap(): void {
  console.log("Loading UrlMAp");
  const loadedFile = readFromFile();
  const loadedMap = jsonToMap(loadedFile);
  overrideMap(loadedMap);
  console.log("UrlMap loaded successfully");
}

/**
 * Retrieves the long URL for a given short ID.
 *
 * @param shortId - The short identifier
 * @returns The corresponding long URL
 * @throws NotFoundError if the short ID does not exist
 */
export function getLongByShort(shortId: string): string {
  const entry = urlMap.get(shortId);

  if (!entry) {
    throw new NotFoundError(404, `URL not found for shortID ${shortId}`);
  }
  return entry.longUrl;
}

/**
 * Deletes a mapping by its short ID.
 * Also persists the updated map to file.
 *
 * @param shortId - The short identifier to delete
 * @throws NotFoundError if the short ID does not exist
 */
export function deleteSingleEntry(shortId: string): void {
  const wasDeleted = urlMap.delete(shortId);
  if (!wasDeleted) {
    throw new NotFoundError(404, `URL not found for shortID ${shortId}`);
  }
  const converted = mapToJson(urlMap);
  saveToFile(converted);
  console.log(`deleted item with shortId ${shortId}`);
}

/**
 * Returns the current in-memory URL map.
 *
 * @returns The URL map
 */
export function getUrlMap() {
  return urlMap;
}

/**
 * Replaces the entire URL map with a new one.
 *
 * @param newMap - The new map to use
 */
export function overrideMap(newMap: Map<string, UrlEntry>): void {
  urlMap = newMap;
}

/**
 * Updates an existing short URL with a new long URL.
 *
 * @param shortId - The short identifier
 * @param newLong - The new long URL
 * @throws NotFoundError if the short ID does not exist
 */
export function overrideSingleShort(shortId: string, newLong: string): void {
  if (!urlMap.has(shortId)) {
    throw new NotFoundError(404, `Short URL not found for ${shortId}`);
  }
  saveNewToMap(shortId, newLong);
}

/**
 * Checks whether a short ID exists in the map.
 *
 * @param shortId - The short identifier
 * @returns True if the short ID exists, otherwise false
 */
export function hasShortId(shortId: string): boolean {
  return urlMap.has(shortId);
}

/**
 * Loads the URL map directly from file and replaces the current map.
 * (Alternative to loadUrlMap)
 */
export function loadMap() {
  urlMap = jsonToMap(readFromFile());
}
