"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const url_service_1 = require("./url.service");
const validate_utils_1 = require("../util/validate.utils");
const AppError_1 = require("../error/AppError");
const urlRouter = (0, express_1.Router)();
urlRouter.post("/shorten", (req, res) => {
    try {
        const { longUrl } = req.body;
        (0, validate_utils_1.validateLongUrl)(longUrl);
        const shortId = (0, url_service_1.createShortId)(longUrl);
        return res
            .status(201)
            .header({ "Content-Location": "http://localhost:3000/url/" + shortId })
            .json({ shortId });
    }
    catch (err) {
        console.log(err);
        if (err instanceof AppError_1.AppError) {
            return res.status(err.status).json({ error: err.message });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
urlRouter.get("/:shortId", (req, res) => {
    try {
        const { shortId } = req.params;
        (0, validate_utils_1.validateShortId)(shortId);
        const longUrl = (0, url_service_1.getLongUrl)(shortId);
        return res.redirect(302, longUrl);
    }
    catch (err) {
        console.error(err);
        if (err instanceof AppError_1.AppError) {
            return res.status(err.status).json({ error: err.message });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
urlRouter.delete("/:shortId", (req, res) => {
    try {
        const { shortId } = req.params;
        (0, validate_utils_1.validateShortId)(shortId);
        (0, url_service_1.deleteByShort)(shortId);
        return res.sendStatus(204);
    }
    catch (err) {
        console.error(err);
        if (err instanceof AppError_1.AppError) {
            return res.status(err.status).json({ error: err.message });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
});
urlRouter.put("/:shortId", (req, res) => {
    try {
        const { longUrl } = req.body;
        const { shortId } = req.params;
        (0, validate_utils_1.validateShortId)(shortId);
        (0, validate_utils_1.validateLongUrl)(longUrl);
        (0, url_service_1.updateByShort)(shortId, longUrl);
        return res
            .status(200)
            .header({ "Content-Location": "http://localhost:3000/url/" + shortId })
            .send(`${shortId} successfully updated`);
    }
    catch (err) {
        console.error(err);
        if (err instanceof AppError_1.AppError) {
            return res.status(err.status).json({ error: err.message });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = urlRouter;
//# sourceMappingURL=url.controller.js.map