"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const url_service_1 = require("./url.service");
const urlRouter = (0, express_1.Router)();
urlRouter.post("/shorten", (req, res) => {
    res.send((0, url_service_1.createShortUrl)());
});
exports.default = urlRouter;
//# sourceMappingURL=url.controller.js.map