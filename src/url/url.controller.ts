import { Router, Request, Response } from "express";
import { createShortUrl } from "./url.service";

const urlRouter = Router();

urlRouter.post("/shorten", (req: Request, res: Response) => {
  res.status(201).json({ shortUrl: createShortUrl(req.body.longUrl) });
});

export default urlRouter;
