import { Router, Request, Response } from "express";
import {
  createShortId,
  deleteByShort,
  getLongUrl,
  updateByShort,
} from "./url.service";

import { CreateUrlDto } from "./url.interface";
import { validateLongUrl, validateShortId } from "../util/validate.utils";
import { AppError } from "../error/AppError";

const urlRouter = Router();

urlRouter.post(
  "/shorten",
  (req: Request<{}, {}, CreateUrlDto>, res: Response) => {
    try {
      const { longUrl } = req.body;
      validateLongUrl(longUrl);

      const shortId = createShortId(longUrl);

      return res
        .status(201)
        .header({ "Content-Location": "http://localhost:3000/url/" + shortId })
        .json({ shortId });
    } catch (err: unknown) {
      console.log(err);
      if (err instanceof AppError) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

urlRouter.get(
  "/:shortId",
  (req: Request<{ shortId: string }>, res: Response) => {
    try {
      const { shortId } = req.params;
      validateShortId(shortId);
      const longUrl = getLongUrl(shortId);

      return res.redirect(302, longUrl);
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof AppError) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

urlRouter.delete(
  "/:shortId",
  (req: Request<{ shortId: string }>, res: Response) => {
    try {
      const { shortId } = req.params;
      validateShortId(shortId);

      deleteByShort(shortId);

      return res.sendStatus(204);
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof AppError) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  },
);

urlRouter.put(
  "/:shortId",
  (req: Request<{ shortId: string }, {}, CreateUrlDto>, res: Response) => {
    try {
      const { longUrl } = req.body;
      const { shortId } = req.params;

      validateShortId(shortId);
      validateLongUrl(longUrl);

      updateByShort(shortId, longUrl);
      return res.status(200).send(`${shortId} successfully updated`);
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof AppError) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  },
);

export default urlRouter;
