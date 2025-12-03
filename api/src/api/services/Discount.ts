import { v4 } from "uuid";
import prisma from "../../lib/db";
import { createNotification } from "./Notification";

class Discount {
  private prismaClient;

  constructor(prismaClient = prisma) {
    this.prismaClient = prismaClient;
  }

  public async addDiscount(
    expiryDate: string,
    discountedPrice: number,
    customerId: string,
    productId: string,
    panelUserId: string
  ) {
    const discount = await this.prismaClient.discount.create({
      data: {
        coupon_code: `coupon-${v4()}`,
        expiry_date: expiryDate,
        discounted_price: discountedPrice,
        customer_id: customerId,
        product_id: productId,
        panel_user_id: panelUserId,
      },
      include: {
        customer: {
          select: {
            business: true,
          },
        },
        product: {
          select: {
            title: true,
          },
        },
        panel_user: {
          select: {
            fullname: true,
          },
        },
      },
    });

    await createNotification(
      "Discount assigned",
      `Discount has been assigned to ${discount.customer?.business} on product ${discount.product.title}`,
      discount.panel_user?.fullname!
    );

    return discount;
  }
}

export default Discount;
