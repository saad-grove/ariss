import { v4 } from "uuid";
import prisma from "../../lib/db";
import { createNotification } from "./Notification";
import cloudinary from "../../lib/cloudinary";

class Product {
  private prismaClient;

  constructor(prismaClient = prisma) {
    this.prismaClient = prismaClient;
  }

  public async addProduct(
    title: string,
    price: number,
    quantity: number,
    description: any,
    img1: string,
    img2: string,
    img3: string,
    img4: string,
    subcategoryId: string,
    panelUserId: string
  ) {
    const existing = await this.prismaClient.product.findUnique({
      where: {
        title,
      },
    });

    if (existing) throw new Error("Product already exist");

    const uploaderImage1 = cloudinary.uploader.upload(img1);
    const imageUrl1 = (await uploaderImage1).secure_url;

    const uploaderImage2 = cloudinary.uploader.upload(img2);
    const imageUrl2 = (await uploaderImage2).secure_url;

    const uploaderImage3 = cloudinary.uploader.upload(img3);
    const imageUrl3 = (await uploaderImage3).secure_url;

    const uploaderImage4 = cloudinary.uploader.upload(img4);
    const imageUrl4 = (await uploaderImage4).secure_url;

    const product = await this.prismaClient.product.create({
      data: {
        id: `prod-${v4()}`,
        title,
        price,
        quantity,
        description,
        img1: imageUrl1 || img1,
        img2: imageUrl2 || img2,
        img3: imageUrl3 || img3,
        img4: imageUrl4 || img4,
        subcategory_id: subcategoryId,
        panel_user_id: panelUserId,
      },
      include: {
        subcategory: {
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
      "Product added",
      `New product ${product.title} has been added under subcategory ${product.subcategory?.title}`,
      product.panel_user?.fullname!
    );

    return product;
  }

  public async fetchAllProducts() {
    return await this.prismaClient.product.findMany({
      orderBy: {
        created_at: "desc",
      },
      include: {
        subcategory: {
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
  }

  public async deleteProduct(id: string, panelUserId: string) {
    await this.prismaClient.product.update({
      where: {
        id,
      },
      data: {
        panel_user_id: panelUserId,
      },
    });

    const product = await this.prismaClient.product.delete({
      where: {
        id,
      },
      include: {
        panel_user: {
          select: {
            fullname: true,
          },
        },
      },
    });

    // if (product.img1 && product.img1.includes("cloudinary")) {
    //   try {
    //     const publicId = product.img1.split("/").pop()?.split(".")[0];
    //     await cloudinary.uploader.destroy(publicId!);
    //   } catch (error) {
    //     console.log("Error deleting from cloudinary");
    //   }
    // }

    // if (product.img2 && product.img2.includes("cloudinary")) {
    //   try {
    //     const publicId = product.img2.split("/").pop()?.split(".")[0];
    //     await cloudinary.uploader.destroy(publicId!);
    //   } catch (error) {
    //     console.log("Error deleting from cloudinary");
    //   }
    // }

    // if (product.img3 && product.img3.includes("cloudinary")) {
    //   try {
    //     const publicId = product.img3.split("/").pop()?.split(".")[0];
    //     await cloudinary.uploader.destroy(publicId!);
    //   } catch (error) {
    //     console.log("Error deleting from cloudinary");
    //   }
    // }

    // if (product.img4 && product.img4.includes("cloudinary")) {
    //   try {
    //     const publicId = product.img4.split("/").pop()?.split(".")[0];
    //     await cloudinary.uploader.destroy(publicId!);
    //   } catch (error) {
    //     console.log("Error deleting from cloudinary");
    //   }
    // }

    await createNotification(
      "Product delete",
      `Product ${product.title} was permanently deleted`,
      product?.panel_user?.fullname!
    );

    return product;
  }

  public async releaseProduct(id: string, panelUserId: string) {
    const product = this.prismaClient.product.update({
      where: {
        id,
      },
      data: {
        is_public: true,
        panel_user_id: panelUserId,
      },
      include: {
        panel_user: {
          select: {
            fullname: true,
          },
        },
      },
    });

    await createNotification(
      "Product released",
      `Product ${(await product).title} has been released to customers`,
      null
    );

    return product;
  }

  public async unreleaseProduct(id: string, panelUserId: string) {
    const product = this.prismaClient.product.update({
      where: {
        id,
      },
      data: {
        is_public: false,
        panel_user_id: panelUserId,
      },
    });

    await createNotification(
      "Product unreleased",
      `Product ${(await product).title} has been hidden from customers`,
      null
    );

    return product;
  }
}

export default Product;
