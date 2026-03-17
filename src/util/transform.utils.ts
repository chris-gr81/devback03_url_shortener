import { UrlEntry } from "../db/db.types";

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

export function mapToJson(currentMap: Map<string, UrlEntry>): string {
  const obj = Object.fromEntries(currentMap);
  const converted = JSON.stringify(obj, null, 2);
  return converted;
}
