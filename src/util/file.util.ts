import fs from "fs";
import path from "path";
import { getUrlMap, overrideMap } from "../db/db";
import { jsonToMap } from "./transform.utils";

const filePath = path.join(__dirname, "/../db/", "urlmap.json");

export function saveToFile(): void {
  const obj = Object.fromEntries(getUrlMap());
  const json = JSON.stringify(obj, null, 2);

  fs.writeFile(filePath, json, (err) => {
    if (err) {
      console.log(`Error while writing to db: ${err}`);
      return;
    }
    console.log("DB saved");
  });
}

export function readFromFile(): void {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    overrideMap(jsonToMap(data));
  } catch (error) {
    console.log(error);
    return;
  }
}
