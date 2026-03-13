import express, { Router } from "express";
import router from "./routes/router";
const app = express();
const port = process.env.port || 3000;

// Middleware
app.use(express.json());
app.use("/url", router);

// root-route
app.get("/", (req, res) => {
  res.send("Welcome my friend");
});

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});
