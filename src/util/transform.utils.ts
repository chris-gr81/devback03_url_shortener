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

export function isValidUrl(parsedUrl: string): boolean {
  try {
    new URL(parsedUrl);
    return true;
  } catch {
    return false;
  }
}

export function isValidShortId(shortId: unknown): shortId is string {
  return typeof shortId === "string" && shortId.trim() !== "";
}

export function isValidLongUrl(longUrl: unknown): longUrl is string {
  return (
    typeof longUrl === "string" && longUrl.trim() !== "" && isValidUrl(longUrl)
  );
}
