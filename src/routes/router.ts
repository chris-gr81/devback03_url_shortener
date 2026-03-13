import { Router } from "express";
import urlRouter from "../url/url.controller";

const router = Router();

router.use("/url", urlRouter);

export default router;
