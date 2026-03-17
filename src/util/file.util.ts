import fs from "fs";
import path from "path";
import { overrideMap } from "../db/db";
import { jsonToMap } from "./transform.utils";
import { AppError } from "../error/AppError";

const filePath = path.join(__dirname, "/../db/", "urlmap.json");

export function saveToFile(converted: string): void {
  try {
    fs.writeFileSync(filePath, converted);
    console.log("Saved to DB");
  } catch (err) {
    throw new AppError(500, "Failed to save database file");
  }
}

export function readFromFile(): string {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (err) {
    return "";
  }
}
