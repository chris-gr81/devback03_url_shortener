import { ValidationError } from "../error/ValidationError";
import { SHORT_ID_LENGTH, SHORT_ID_REGEX } from "./constants";

function isValidUrl(parsedUrl: string): boolean {
  try {
    new URL(parsedUrl);
    return true;
  } catch {
    return false;
  }
}

export function validateShortId(shortId: unknown): asserts shortId is string {
  if (typeof shortId !== "string") {
    throw new ValidationError(400, "shortId must be a string");
  }

  if (!SHORT_ID_REGEX.test(shortId)) {
    throw new ValidationError(
      400,
      `ShortId must be ${SHORT_ID_LENGTH} alphanumeric characters`,
    );
  }
}

export function validateLongUrl(longUrl: unknown): asserts longUrl is string {
  if (typeof longUrl !== "string") {
    throw new ValidationError(400, "LongUrl must be a string");
  }
  if (longUrl.trim() === "") {
    throw new ValidationError(400, "LongUrl must not be empty");
  }
  if (!isValidUrl(longUrl)) {
    throw new ValidationError(400, "Please provide a valid URL");
  }
}
