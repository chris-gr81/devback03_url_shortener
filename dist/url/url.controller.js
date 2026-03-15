"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const url_service_1 = require("./url.service");
const urlRouter = (0, express_1.Router)();
urlRouter.post("/shorten", (req, res) => {
    res.status(201).json({ shortUrl: (0, url_service_1.createShortUrl)(req.body.longUrl) });
});
urlRouter.get("/:shortUrl", (req, res) => {
    const shortId = req.params.shortUrl;
    if (!shortId) {
        throw new Error("Please provide a short id");
    }
    const longUrl = (0, url_service_1.getLongUrl)(shortId);
    res.redirect(302, longUrl);
});
urlRouter.delete("/:shortUrl", (req, res) => {
    const shortId = req.params.shortUrl;
    console.log(shortId);
    if (!shortId || typeof shortId !== "string") {
        return res.status(400).json({ error: "Please provide a valid short id" });
    }
    const deleted = (0, url_service_1.deleteByShort)(shortId);
    if (!deleted) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    console.log(`Deleted ${shortId}`);
    return res.status(204).send();
});
urlRouter.put("/:shortUrl", (req, res) => {
    const newLong = req.body.longUrl;
    const shortId = req.params.shortUrl;
    if (!shortId || typeof shortId !== "string") {
        return res.status(404).json({ error: "Please provide a valid short id" });
    }
    (0, url_service_1.updateByShort)(shortId, newLong);
    res.status(200).send(`${shortId} successfully updated`);
});
exports.default = urlRouter;
//# sourceMappingURL=url.controller.js.map