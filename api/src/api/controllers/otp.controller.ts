import * as otpServices from "../services/OTP";
import { Request, Response } from "express";

export const sendOTPController = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    res.status(404);
    throw new Error("Email not found");
  }

  try {
    const otp = otpServices.generateOTP();
    await otpServices.storeOTP(email, otp);
    await otpServices.sendOTP(email, otp);

    res.status(200).json({
      message: `OTP sent on email - ${email}`,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
