import { Router, Request, Response } from "express";
import {
  createShortId,
  deleteByShort,
  getLongUrl,
  updateByShort,
} from "./url.service";

import { CreateUrlDto } from "./url.interface";
import { validateLongUrl, validateShortId } from "../../util/validate.utils";
import { AppError } from "../../error/AppError";

/**
 * Router for all URL shortener endpoints.
 *
 * Provides routes to:
 * - create a short URL
 * - resolve a short URL
 * - delete a short URL
 * - update a short URL
 */
const urlRouter = Router();

/**
 * Creates a new short URL mapping.
 *
 * Route: POST /shorten
 *
 * Expects a request body containing a valid long URL.
 * Returns the generated short ID and a Content-Location header
 * pointing to the created resource.
 */
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

/**
 * Resolves a short ID to its original long URL.
 *
 * Route: GET /:shortId
 *
 * Validates the short ID and redirects the client
 * to the matching long URL.
 */
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

/**
 * Deletes an existing short URL mapping.
 *
 * Route: DELETE /:shortId
 *
 * Validates the short ID and removes the corresponding entry.
 * Returns HTTP 204 on success.
 */
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

/**
 * Updates the long URL of an existing short ID.
 *
 * Route: PUT /:shortId
 *
 * Expects a valid short ID as route parameter and
 * a valid long URL in the request body.
 * Returns a success message and updates the Content-Location header.
 */
urlRouter.put(
  "/:shortId",
  (req: Request<{ shortId: string }, {}, CreateUrlDto>, res: Response) => {
    try {
      const { longUrl } = req.body;
      const { shortId } = req.params;

      validateShortId(shortId);
      validateLongUrl(longUrl);

      updateByShort(shortId, longUrl);
      return res
        .status(200)
        .header({ "Content-Location": "http://localhost:3000/url/" + shortId })
        .send(`${shortId} successfully updated`);
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
