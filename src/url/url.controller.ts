import { Router, Request, Response } from "express";
import { createShortUrl } from "./url.service";

const urlRouter = Router();

urlRouter.post("/shorten", (req: Request, res: Response) => {
  res.send(createShortUrl());
});

export default urlRouter;
