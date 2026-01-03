import express, { Request, Response } from "express";
import { connectDB } from "./config/db.config";
import { env } from "./config/env.config";
import cors from "cors";
import mainRouter from "./api/routes/index.route";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api", mainRouter);

connectDB();

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
