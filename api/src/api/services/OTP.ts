import crypto from "crypto";
import { Resend } from "resend";
import prisma from "../../lib/db";

const resend = new Resend("re_ZupCyZo9_MW5sciTBNx9efBEa17gQx9pw");

export const generateOTP = () => crypto.randomInt(100000, 999999).toString();

export const sendOTP = async (email: string, otp: string) => {
  await resend.emails.send({
    from: process.env.EMAIL_USER!,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}. It expires in 5 minutes.`,
  });
};

export const storeOTP = async (email: string, otp: string) => {
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  await prisma.oTP.upsert({
    where: { email },
    update: { code: otp, expires_at: expiresAt },
    create: { email, code: otp, expires_at: expiresAt },
  });
};

export const verifyOTP = async (email: string, otp: string) => {
  const record = await prisma.oTP.findUnique({ where: { email } });
  if (!record) return false;

  const expired = record.expires_at < new Date();
  if (expired || record.code !== otp) return false;

  await prisma.oTP.delete({ where: { email } });
  return true;
};

export const wipeOTP = async () => {
  return await prisma.oTP.deleteMany();
};
