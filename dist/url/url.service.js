"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShortId = createShortId;
exports.getLongUrl = getLongUrl;
exports.deleteByShort = deleteByShort;
exports.updateByShort = updateByShort;
const db_1 = require("../db/db");
const constants_1 = require("../util/constants");
const random_utils_1 = require("../util/random.utils");
function createShortId(longUrl) {
    let shortId;
    do {
        shortId = (0, random_utils_1.createRandomNumbers)(constants_1.SHORT_ID_LENGTH);
    } while ((0, db_1.hasShortId)(shortId));
    (0, db_1.saveNewToMap)(shortId, longUrl);
    return shortId;
}
function getLongUrl(shortId) {
    return (0, db_1.getLongByShort)(shortId);
}
function deleteByShort(shortId) {
    (0, db_1.deleteSingleEntry)(shortId);
}
function updateByShort(shortId, newLong) {
    (0, db_1.overrideSingleShort)(shortId, newLong);
}
//# sourceMappingURL=url.service.js.map