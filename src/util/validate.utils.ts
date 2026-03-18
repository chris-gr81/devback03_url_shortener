import { ValidationError } from "../error/ValidationError";
import { SHORT_ID_LENGTH, SHORT_ID_REGEX } from "./constants";

/**
 * Checks whether a given string is a valid URL.
 *
 * Uses the native URL constructor for validation.
 *
 * @param parsedUrl - The URL string to validate.
 * @returns True if the string is a valid URL, otherwise false.
 */
function isValidUrl(parsedUrl: string): boolean {
  try {
    new URL(parsedUrl);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates that the provided shortId is a valid string
 * and matches the expected format.
 *
 * This function uses a TypeScript assertion to narrow the type to string.
 *
 * @param shortId - The value to validate.
 * @throws {ValidationError} If the shortId is not a string or does not match the required format.
 */
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

/**
 * Validates that the provided longUrl is a non-empty string
 * and represents a valid URL.
 *
 * This function uses a TypeScript assertion to narrow the type to string.
 *
 * @param longUrl - The value to validate.
 * @throws {ValidationError} If the value is not a string, empty, or not a valid URL.
 */
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
