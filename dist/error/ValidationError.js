"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const AppError_1 = require("./AppError");
class ValidationError extends AppError_1.AppError {
    constructor(status, message) {
        super(status, message);
        this.name = this.constructor.name;
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=ValidationError.js.map