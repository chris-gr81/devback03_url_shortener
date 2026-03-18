import fs from "fs";
import path from "path";
import { AppError } from "../error/AppError";

const filePath = path.join(__dirname, "/../db/", "urlmap.json");

/**
 * Writes the provided JSON string to the database file.
 *
 * This function overwrites the existing file content with the given data.
 *
 * @param converted - A JSON string representation of the URL map.
 * @throws {AppError} Throws an error if the file cannot be written.
 */
export function saveToFile(converted: string): void {
  try {
    fs.writeFileSync(filePath, converted);
    console.log("Saved to DB");
  } catch (err) {
    throw new AppError(500, "Failed to save database file");
  }
}
/**
 * Reads the database file and returns its content as a string.
 *
 * If the file does not exist or cannot be read, an empty string is returned.
 *
 * @returns The file content as a UTF-8 string, or an empty string if reading fails.
 */
export function readFromFile(): string {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (err) {
    return "";
  }
}
