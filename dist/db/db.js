"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveNewToMap = saveNewToMap;
exports.loadUrlMap = loadUrlMap;
exports.getLongByShort = getLongByShort;
exports.deleteSingleEntry = deleteSingleEntry;
exports.getUrlMap = getUrlMap;
exports.overrideMap = overrideMap;
exports.overrideSingleShort = overrideSingleShort;
exports.hasShortId = hasShortId;
const file_util_1 = require("../util/file.util");
const NotFoundError_1 = require("../error/NotFoundError");
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
function getLongByShort(shortId) {
    const entry = urlMap.get(shortId);
    if (!entry) {
        throw new NotFoundError_1.NotFoundError(404, `URL not found for shortID ${shortId}`);
    }
    return entry.longUrl;
}
function deleteSingleEntry(shortId) {
    const wasDeleted = urlMap.delete(shortId);
    if (!wasDeleted) {
        throw new NotFoundError_1.NotFoundError(404, `URL not found for shortID ${shortId}`);
    }
    (0, file_util_1.saveToFile)();
    console.log(`deleted item with shortId ${shortId}`);
}
function getUrlMap() {
    return urlMap;
}
function overrideMap(newMap) {
    urlMap = newMap;
}
function overrideSingleShort(shortId, newLong) {
    if (!urlMap.has(shortId)) {
        throw new NotFoundError_1.NotFoundError(404, `Short URL not found for ${shortId}`);
    }
    saveNewToMap(shortId, newLong);
}
function hasShortId(shortId) {
    return urlMap.has(shortId);
}
//# sourceMappingURL=db.js.map