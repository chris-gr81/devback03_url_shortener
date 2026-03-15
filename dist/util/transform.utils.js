"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonToMap = jsonToMap;
exports.isValidUrl = isValidUrl;
exports.isValidShortId = isValidShortId;
exports.isValidLongUrl = isValidLongUrl;
function jsonToMap(data) {
    const converted = new Map(Object.entries(JSON.parse(data)));
    // recover date objects
    for (const value of converted.values()) {
        value.createdAt = new Date(value.createdAt);
    }
    return converted;
}
function isValidUrl(parsedUrl) {
    try {
        new URL(parsedUrl);
        return true;
    }
    catch {
        return false;
    }
}
function isValidShortId(shortId) {
    return typeof shortId === "string" && shortId.trim() !== "";
}
function isValidLongUrl(longUrl) {
    return (typeof longUrl === "string" && longUrl.trim() !== "" && isValidUrl(longUrl));
}
//# sourceMappingURL=transform.utils.js.map