"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shortenRouter = (0, express_1.Router)();
shortenRouter.post("/", (res, req) => {
    console.log("Shorten mit post getriggert");
});
exports.default = shortenRouter;
//# sourceMappingURL=shorten.controller.js.map