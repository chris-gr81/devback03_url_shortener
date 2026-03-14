"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomNumbers = createRandomNumbers;
function createRandomNumbers(range) {
    let result = "";
    while (result.length < range) {
        const item = Math.floor(Math.random() * 75) + 48; // numbers from 48 to 122
        if (item <= 57 || // numbers
            (item >= 65 && item <= 90) || // A-Z
            (item >= 97 && item <= 122) // a-z
        ) {
            result += String.fromCharCode(item); // transform ASCII to string
        }
    }
    return result;
}
//# sourceMappingURL=random.utils.js.map