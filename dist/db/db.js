"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveNewToMap = saveNewToMap;
exports.loadUrlMap = loadUrlMap;
exports.getLongByShort = getLongByShort;
exports.deleteSingleEntry = deleteSingleEntry;
exports.getUrlMap = getUrlMap;
exports.overrideMap = overrideMap;
exports.overrideSingleShort = overrideSingleShort;
const file_util_1 = require("../util/file.util");
let urlMap = new Map();
function saveNewToMap(shortUrl, longUrl) {
    urlMap.set(shortUrl, { longUrl: longUrl, createdAt: new Date() });
    (0, file_util_1.saveToFile)();
}
function loadUrlMap() {
    console.log("Loading UrlMAp");
    (0, file_util_1.readFromFile)();
    console.log("UrlMap loaded successfully");
}
function getLongByShort(shortUrl) {
    const item = urlMap.get(shortUrl);
    if (!item) {
        throw new Error(`URL not found for shortID ${shortUrl}`);
    }
    return item.longUrl;
}
function deleteSingleEntry(shortId) {
    const deleted = urlMap.delete(shortId);
    if (deleted) {
        (0, file_util_1.saveToFile)();
        console.log(`deleted item with shortId ${shortId}`);
    }
    return deleted;
}
function getUrlMap() {
    return urlMap;
}
function overrideMap(newMap) {
    urlMap = newMap;
}
function overrideSingleShort(shortId, newLong) {
    if (urlMap.has(shortId)) {
        saveNewToMap(shortId, newLong);
    }
    else {
        console.log(`No entry with id ${shortId} found`);
    }
}
//# sourceMappingURL=db.js.map