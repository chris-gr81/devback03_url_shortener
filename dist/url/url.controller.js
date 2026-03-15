"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const url_service_1 = require("./url.service");
const transform_utils_1 = require("../util/transform.utils");
const urlRouter = (0, express_1.Router)();
urlRouter.post("/shorten", (req, res) => {
    try {
        const { longUrl } = req.body;
        if (!(0, transform_utils_1.isValidLongUrl)(longUrl)) {
            return res.status(400).json({ error: "Please provide a valid URL" });
        }
        const shortId = (0, url_service_1.createShortId)(longUrl);
        return res.status(201).json({ shortId });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to create short ID" });
    }
});
urlRouter.get("/:shortId", (req, res) => {
    try {
        const { shortId } = req.params;
        if (!(0, transform_utils_1.isValidShortId)(shortId)) {
            return res.status(400).json({ error: "Please provide a valid ID" });
        }
        const longUrl = (0, url_service_1.getLongUrl)(shortId);
        return res.redirect(302, longUrl);
    }
    catch (err) {
        console.error(err);
        return res.status(404).json({ error: "Short URL not found" });
    }
});
urlRouter.delete("/:shortId", (req, res) => {
    try {
        const { shortId } = req.params;
        if (!(0, transform_utils_1.isValidShortId)(shortId)) {
            return res.status(400).json({ error: "Please provide a valid ID" });
        }
        (0, url_service_1.deleteByShort)(shortId);
        return res.sendStatus(204);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});
urlRouter.put("/:shortId", (req, res) => {
    try {
        const { longUrl } = req.body;
        const { shortId } = req.params;
        if (!(0, transform_utils_1.isValidShortId)(shortId)) {
            return res.status(400).json({ error: "Please provide a valid ID" });
        }
        if (!(0, transform_utils_1.isValidLongUrl)(longUrl)) {
            return res.status(400).json({ error: "Please provide a valid URL" });
        }
        (0, url_service_1.updateByShort)(shortId, longUrl);
        return res.status(200).send(`${shortId} successfully updated`);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = urlRouter;
//# sourceMappingURL=url.controller.js.map