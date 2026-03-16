import { Router, Request, Response } from "express";
import {
  createShortId,
  deleteByShort,
  getLongUrl,
  updateByShort,
} from "./url.service";
import { isValidLongUrl, isValidShortId } from "../util/transform.utils";
import { CreateUrlDto } from "./url.interface";

const urlRouter = Router();

urlRouter.post(
  "/shorten",
  (req: Request<{}, {}, CreateUrlDto>, res: Response) => {
    try {
      const { longUrl } = req.body;

      if (!isValidLongUrl(longUrl)) {
        return res.status(400).json({ error: "Please provide a valid URL" });
      }

      const shortId = createShortId(longUrl);

      return res.status(201).json({ shortId });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to create short ID" });
    }
  },
);

urlRouter.get(
  "/:shortId",
  (req: Request<{ shortId: string }>, res: Response) => {
    try {
      const { shortId } = req.params;

      if (!isValidShortId(shortId)) {
        return res.status(400).json({ error: "Please provide a valid ID" });
      }

      const longUrl = getLongUrl(shortId);

      return res.redirect(302, longUrl);
    } catch (err) {
      console.error(err);
      return res.status(404).json({ error: "Short URL not found" });
    }
  },
);

urlRouter.delete(
  "/:shortId",
  (req: Request<{ shortId: string }>, res: Response) => {
    try {
      const { shortId } = req.params;
      if (!isValidShortId(shortId)) {
        return res.status(400).json({ error: "Please provide a valid ID" });
      }

      deleteByShort(shortId);

      return res.sendStatus(204);
    } catch (err) {
      console.error(err);
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

      if (!isValidShortId(shortId)) {
        return res.status(400).json({ error: "Please provide a valid ID" });
      }
      if (!isValidLongUrl(longUrl)) {
        return res.status(400).json({ error: "Please provide a valid URL" });
      }
      updateByShort(shortId, longUrl);
      return res.status(200).send(`${shortId} successfully updated`);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
);

export default urlRouter;
