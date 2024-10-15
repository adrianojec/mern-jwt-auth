import express, { Request, Response } from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    status: "healthy",
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000 in development environment");
});
