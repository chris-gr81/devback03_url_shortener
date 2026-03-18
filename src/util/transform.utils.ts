import { UrlEntry } from "../db/db.types";

/**
 * Converts a JSON string into a Map of URL entries.
 *
 * The function parses the JSON string, transforms it into a Map,
 * and restores the `createdAt` property back to a Date object.
 *
 * @param data - A JSON string representing an object with short URLs as keys and UrlEntry objects as values.
 * @returns A Map where the key is the short URL and the value is a UrlEntry object.
 *
 * @throws {SyntaxError} If the provided string is not valid JSON.
 */
export function jsonToMap(data: string): Map<string, UrlEntry> {
  const converted = new Map(
    Object.entries(JSON.parse(data)) as [string, UrlEntry][],
  );

  // recover date objects
  for (const value of converted.values()) {
    value.createdAt = new Date(value.createdAt);
  }

  return converted;
}

/**
 * Converts a Map of URL entries into a formatted JSON string.
 *
 * The Map is transformed into a plain object before being stringified.
 *
 * @param currentMap - A Map containing short URLs as keys and UrlEntry objects as values.
 * @returns A pretty-printed JSON string representation of the Map.
 */
export function mapToJson(currentMap: Map<string, UrlEntry>): string {
  const obj = Object.fromEntries(currentMap);
  const converted = JSON.stringify(obj, null, 2);
  return converted;
}
