import { Router, Request, Response } from "express";
import {
  createShortUrl,
  deleteByShort,
  getLongUrl,
  updateByShort,
} from "./url.service";

const urlRouter = Router();

urlRouter.post("/shorten", (req: Request, res: Response) => {
  res.status(201).json({ shortUrl: createShortUrl(req.body.longUrl) });
});

urlRouter.get("/:shortUrl", (req: Request, res: Response) => {
  const shortId = req.params.shortUrl as string;
  if (!shortId) {
    throw new Error("Please provide a short id");
  }
  const longUrl = getLongUrl(shortId);

  res.redirect(302, longUrl);
});

urlRouter.delete("/:shortUrl", (req: Request, res: Response) => {
  const shortId = req.params.shortUrl;
  console.log(shortId);
  if (!shortId || typeof shortId !== "string") {
    return res.status(400).json({ error: "Please provide a valid short id" });
  }
  const deleted = deleteByShort(shortId);

  if (!deleted) {
    return res.status(404).json({ error: "Short URL not found" });
  }
  console.log(`Deleted ${shortId}`);
  return res.status(204).send();
});

urlRouter.put("/:shortUrl", (req: Request, res: Response) => {
  const newLong = req.body.longUrl;
  const shortId = req.params.shortUrl;

  if (!shortId || typeof shortId !== "string") {
    return res.status(404).json({ error: "Please provide a valid short id" });
  }

  updateByShort(shortId, newLong);
  res.status(200).send(`${shortId} successfully updated`);
});

export default urlRouter;
