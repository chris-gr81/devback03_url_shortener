"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonToMap = jsonToMap;
function jsonToMap(data) {
    const converted = new Map(Object.entries(JSON.parse(data)));
    // recover date objects
    for (const value of converted.values()) {
        value.createdAt = new Date(value.createdAt);
    }
    return converted;
}
//# sourceMappingURL=transform.utils.js.map