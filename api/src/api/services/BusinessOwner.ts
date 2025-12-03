import { v4 } from "uuid";
import prisma from "../../lib/db";
import { verifyOTP } from "./OTP";
import { CustomerType } from "@prisma/client";
import { createNotification } from "./Notification";

class BusinessOwner {
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

  public async fetchAllApproved() {
    return await this.prismaClient.customer.findMany({
      where: {
        role: CustomerType.DEALER,
        is_approved: true,
      },
    });
  }

  public async fetchAllNonApproved() {
    return await this.prismaClient.customer.findMany({
      where: {
        role: CustomerType.DEALER,
        is_approved: false,
      },
    });
  }

  public async updateOwnerAddress(
    shippingAddress: any,
    billingAddress: any,
    email: string
  ) {
    const existing = await this.prismaClient.customer.findUnique({
      where: {
        email,
        role: CustomerType.DEALER,
      },
    });

    if (!existing) throw new Error("Business owner do not exist");

    const owner = await this.prismaClient.customer.update({
      where: {
        email,
      },
      data: {
        shipping_address: shippingAddress,
        billing_address: billingAddress,
      },
    });

    await createNotification(
      "Dealer address update",
      `${owner.business} has updated their address`,
      null
    );

    return owner;
  }

  public async deleteCustomer(email: string) {
    const existing = await this.prismaClient.customer.findUnique({
      where: {
        email,
      },
      include: {
        dealer_user: {
          select: {
            business: true,
          },
        },
      },
    });

    const owner = await this.prismaClient.customer.delete({
      where: {
        email,
      },
    });

    if (owner.role === "DEALER") {
      await createNotification(
        "Customer account deleted",
        `Dealer of ${existing?.business} has deleted their account`,
        null
      );
    } else if (owner.role === "TECHNICIAN") {
      await createNotification(
        "Customer account deleted",
        `Technician of ${existing?.dealer_user?.business} has deleted their account`,
        null
      );
    } else {
      await createNotification(
        "Customer account deleted",
        `Backoffice of ${existing?.dealer_user?.business} has deleted their account`,
        null
      );
    }

    // TODO: Create email notification

    return owner;
  }

  public async approveOwner(email: string) {
    const customer = await this.prismaClient.customer.update({
      where: {
        email,
        is_approved: false,
        role: CustomerType.DEALER,
      },
      data: {
        is_approved: true,
      },
    });

    await createNotification(
      `Business ${customer.role} approved`,
      `${customer.business} is approved to use the app`,
      null
    );

    return customer;
  }

  public async disapproveOwner(email: string) {
    const customer = await this.prismaClient.customer.update({
      where: {
        email,
        is_approved: true,
        role: CustomerType.DEALER,
      },
      data: {
        is_approved: false,
      },
    });

    await createNotification(
      `Business ${customer.role} approved`,
      `${customer.business} is approved to use the app`,
      null
    );

    return customer;
  }
}

export default BusinessOwner;
