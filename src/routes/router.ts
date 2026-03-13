import { Router } from "express";
import shortenRouter from "../shorten/shorten.controller";

const router = Router();

router.use("/shorten", shortenRouter);

export default router;
