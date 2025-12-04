import prisma from "../../lib/db";
import { generateToken } from "../../lib/generate-token";
import { verifyOTP } from "./OTP";

class Customer {
  private prismaClient;

  constructor(prismaClient = prisma) {
    this.prismaClient = prismaClient;
  }

  public async loginUser(email: string, otp: string) {
    const user = await this.prismaClient.customer.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new Error("User not found");

    if (!(await verifyOTP(email, otp))) {
      console.error("Invalid OTP");
      throw new Error("Invalid or expired OTP");
    }

    const token = generateToken(user.id);

    return { user, token };
  }

  public async getProfile(userId: string) {
    return await this.prismaClient.customer.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
