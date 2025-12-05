import { v4 } from "uuid";
import prisma from "../../lib/db";
import { generateToken } from "../../lib/generate-token";
import { verifyOTP } from "./OTP";
import { CustomerType } from "@prisma/client";
import { createNotification } from "./Notification";

class Customer {
  private prismaClient;

  constructor(prismaClient = prisma) {
    this.prismaClient = prismaClient;
  }

  public async registerOwner(
    email: string,
    phone: string,
    name: string,
    gstin: string,
    business: string,
    shippingAddress: any,
    billingAddress: any,
    otp: string
  ) {
    const existing = await this.prismaClient.customer.findUnique({
      where: {
        email,
      },
    });

    if (existing) throw new Error("Business owner account already exist");

    if (!(await verifyOTP(email, otp))) {
      console.error("Invalid OTP");
      throw new Error("Invalid or expired OTP");
    }

    const owner = await this.prismaClient.customer.create({
      data: {
        id: `dealer-${v4()}`,
        email,
        phone,
        name,
        role: CustomerType.DEALER,
        gstin,
        business,
        shipping_address: shippingAddress,
        billing_address: billingAddress,
      },
    });

    await createNotification(
      "Dealer account registration",
      `New ${owner.business} is waiting for your approval`,
      null
    );

    // await waitForApproval(email);

    return owner;
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

export default Customer;
