import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import mainRouter from "./api/routes/index.route";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api", mainRouter);

app.get("/api", (_req: Request, res: Response) => {
  res.status(200).json({ server: true });
});

export default app;
