import { Router } from "express";
import { sendOTPController } from "../controllers/otp.controller";

const otpRouter = Router();

otpRouter.post("/", sendOTPController);

export default otpRouter;
