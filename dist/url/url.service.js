"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShortUrl = createShortUrl;
const db_1 = require("../db/db");
const random_utils_1 = require("../util/random.utils");
function createShortUrl(longUrl = "bla") {
    const shortUrl = (0, random_utils_1.createRandomNumbers)(6);
    (0, db_1.saveNewToMap)(shortUrl, longUrl);
    return shortUrl;
}
//# sourceMappingURL=url.service.js.map