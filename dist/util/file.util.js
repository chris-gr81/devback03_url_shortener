"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveToFile = saveToFile;
exports.readFromFile = readFromFile;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const db_1 = require("../db/db");
const transform_utils_1 = require("./transform.utils");
const AppError_1 = require("../error/AppError");
const filePath = path_1.default.join(__dirname, "/../db/", "urlmap.json");
function saveToFile() {
    const obj = Object.fromEntries((0, db_1.getUrlMap)());
    const json = JSON.stringify(obj, null, 2);
    try {
        fs_1.default.writeFileSync(filePath, json);
        console.log("Saved to DB");
    }
    catch (err) {
        throw new AppError_1.AppError(500, "Failed to save database file");
    }
}
function readFromFile() {
    try {
        const data = fs_1.default.readFileSync(filePath, "utf8");
        (0, db_1.overrideMap)((0, transform_utils_1.jsonToMap)(data));
        console.log("DB loaded");
    }
    catch {
        console.warn("No DB file found, starting with empty DB");
        return;
    }
}
//# sourceMappingURL=file.util.js.map