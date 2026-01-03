import express, { Request, Response } from "express";
import { connectDB } from "./config/db.config";
import { env } from "./config/env.config";

const app = express();

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

connectDB();

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
