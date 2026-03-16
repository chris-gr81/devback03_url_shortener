import fs from "fs";
import path from "path";
import { getUrlMap, overrideMap } from "../db/db";
import { jsonToMap } from "./transform.utils";
import { AppError } from "../error/AppError";

const filePath = path.join(__dirname, "/../db/", "urlmap.json");

export function saveToFile(): void {
  const obj = Object.fromEntries(getUrlMap());
  const json = JSON.stringify(obj, null, 2);

  try {
    fs.writeFileSync(filePath, json);
    console.log("Saved to DB");
  } catch (err) {
    throw new AppError(500, "Failed to save database file");
  }
}

export function readFromFile(): void {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    overrideMap(jsonToMap(data));
    console.log("DB loaded");
  } catch {
    console.warn("No DB file found, starting with empty DB");
    return;
  }
}
