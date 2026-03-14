import { saveNewToMap } from "../db/db";
import { createRandomNumbers } from "../util/random.utils";

export function createShortUrl(longUrl: string = "bla"): string {
  const shortUrl = createRandomNumbers(6);
  saveNewToMap(shortUrl, longUrl);
  return shortUrl;
}
