import { v4 } from "uuid";
import prisma from "../../lib/db";
import { verifyOTP } from "./OTP";
import { CustomerType } from "@prisma/client";
import { createNotification } from "./Notification";

class BusinessEmployee {
  private prismaClient;

  constructor(prismaClient = prisma) {
    this.prismaClient = prismaClient;
  }

  async registerEmployee(
    email: string,
    phone: string,
    name: string,
    role: CustomerType,
    dealerId: string,
    otp: string
  ) {
    const existing = await this.prismaClient.customer.findUnique({
      where: {
        email,
      },
    });

    if (existing) throw new Error("User with this account already exist");

    if (!(await verifyOTP(email, otp))) {
      console.error("Invalid OTP");
      throw new Error("Invalid or expired OTP");
    }

    const employee = await this.prismaClient.customer.create({
      data: {
        id: `${role.toLowerCase()}-${v4()}`,
        phone,
        email,
        name,
        role,
        dealer_id: dealerId,
      },
      include: {
        dealer_user: {
          select: {
            business: true,
          },
        },
      },
    });

    const lowered = employee.role.toLowerCase();
    const capitalized = lowered.charAt(0).toUpperCase() + lowered.slice(1);

    await createNotification(
      `${capitalized} account registration`,
      `New ${capitalized} of ${employee.dealer_user?.business} is waiting for approval`,
      null
    );

    // await waitForApprovalEmployee(email);

    return employee;
  }

  async getAllTechnicians() {
    return await this.prismaClient.customer.findMany({
      where: {
        role: CustomerType.TECHNICIAN,
      },
    });
  }

  async getAllBackoffice() {
    return await this.prismaClient.customer.findMany({
      where: {
        role: CustomerType.BACKOFFICE,
      },
    });
  }
}

export default BusinessEmployee;
