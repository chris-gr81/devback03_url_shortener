"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateShortId = validateShortId;
exports.validateLongUrl = validateLongUrl;
const ValidationError_1 = require("../error/ValidationError");
const constants_1 = require("./constants");
function isValidUrl(parsedUrl) {
    try {
        new URL(parsedUrl);
        return true;
    }
    catch {
        return false;
    }
}
function validateShortId(shortId) {
    if (typeof shortId !== "string") {
        throw new ValidationError_1.ValidationError(400, "shortId must be a string");
    }
    if (!constants_1.SHORT_ID_REGEX.test(shortId)) {
        throw new ValidationError_1.ValidationError(400, `ShortId must be ${constants_1.SHORT_ID_LENGTH} alphanumeric characters`);
    }
}
function validateLongUrl(longUrl) {
    if (typeof longUrl !== "string") {
        throw new ValidationError_1.ValidationError(400, "LongUrl must be a string");
    }
    if (longUrl.trim() === "") {
        throw new ValidationError_1.ValidationError(400, "LongUrl must not be empty");
    }
    if (!isValidUrl(longUrl)) {
        throw new ValidationError_1.ValidationError(400, "Please provide a valid URL");
    }
}
//# sourceMappingURL=validate.utils.js.map