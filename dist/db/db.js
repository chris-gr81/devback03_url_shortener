"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveNewToMap = saveNewToMap;
const urlMap = new Map();
function saveNewToMap(shortUrl, longUrl) {
    urlMap.set(shortUrl, { longUrl: longUrl, createdAt: new Date() });
    console.log(urlMap);
}
//# sourceMappingURL=db.js.map