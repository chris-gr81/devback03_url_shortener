"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShortUrl = createShortUrl;
exports.getLongUrl = getLongUrl;
exports.deleteByShort = deleteByShort;
exports.updateByShort = updateByShort;
const db_1 = require("../db/db");
const random_utils_1 = require("../util/random.utils");
function createShortUrl(longUrl = "bla") {
    const shortUrl = (0, random_utils_1.createRandomNumbers)(6);
    (0, db_1.saveNewToMap)(shortUrl, longUrl);
    return shortUrl;
}
function getLongUrl(shortUrl) {
    return (0, db_1.getLongByShort)(shortUrl);
}
function deleteByShort(shortId) {
    return (0, db_1.deleteSingleEntry)(shortId);
}
function updateByShort(shortId, newLong) {
    (0, db_1.overrideSingleShort)(shortId, newLong);
}
//# sourceMappingURL=url.service.js.map