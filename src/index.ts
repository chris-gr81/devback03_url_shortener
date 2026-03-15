import express from "express";
import router from "./routes/router";
import { loadUrlMap } from "./db/db";

const app = express();
const port = process.env.PORT || 3000;

// initialize db
loadUrlMap();

// Middleware
app.use(express.json());

// Routes
app.use("/", router);

// start server
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});
