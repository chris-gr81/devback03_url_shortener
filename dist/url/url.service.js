"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShortUrl = createShortUrl;
function createShortUrl() {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let shortUrl = "";
    for (let i = 0; i < 6; i++) {
        shortUrl += charset[Math.floor(Math.random() * charset.length)];
    }
    return shortUrl;
}
//# sourceMappingURL=url.service.js.map