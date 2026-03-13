import { Router } from "express";

const shortenRouter = Router();

shortenRouter.post("/", (res, req) => {
  console.log("Shorten mit post getriggert");
});

export default shortenRouter;
