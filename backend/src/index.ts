import "dotenv/config";
import express from "express";
import { NODE_ENV, PORT } from "./constants/env";
import connectToDatabase from "./config/db";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    status: "healthy",
  });
});

app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT} in ${NODE_ENV} environment`);
  await connectToDatabase();
});
