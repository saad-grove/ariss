import prisma from "../../lib/db";
import { v4 as uuid } from "uuid";
import { createNotification } from "./Notification";
import cloudinary from "../../lib/cloudinary";

class Subcategory {
  private prismaClient;

  constructor(prismaClient = prisma) {
    this.prismaClient = prismaClient;
  }

  public async addSubcategory(
    title: string,
    description: string,
    image: string,
    categoryId: string,
    panelUserId: string
  ) {
    const exisiting = await this.prismaClient.subcategory.findUnique({
      where: {
        title,
      },
    });

    if (exisiting) throw new Error("Subcategory already exists");

    const uploaderImage = cloudinary.uploader.upload(image);
    const imageUrl = (await uploaderImage).secure_url;

    const subcategory = await this.prismaClient.subcategory.create({
      data: {
        id: `subcategory-${uuid()}`,
        title,
        description,
        image: imageUrl,
        category_id: categoryId,
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

    createNotification(
      "Subcategory added",
      `New ${subcategory.title} added to the stocks`,
      subcategory.panel_user?.fullname!
    );

    return subcategory;
  }

  public async getAllSubcategory() {
    return await this.prismaClient.subcategory.findMany({
      include: {
        category: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }

  public async getSingleSubcategory(id: string) {
    const subcategory = await this.prismaClient.subcategory.findUnique({
      where: {
        id,
      },
      include: {
        category: {
          select: {
            title: true,
          },
        },
      },
    });

    if (!subcategory) throw new Error("Subcategory do not exist");

    return subcategory;
  }

  public async updateSubcategory(
    id: string,
    title: string,
    description: string,
    image: string,
    categoryId: string,
    panelUserId: string
  ) {
    const exisiting = await this.prismaClient.subcategory.findUnique({
      where: {
        id,
      },
    });

    if (!exisiting) throw new Error("Subcategory do not exist");

    const uploaderImage = cloudinary.uploader.upload(image);
    const imageUrl = (await uploaderImage).secure_url;

    const subcategory = await this.prismaClient.subcategory.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        image: imageUrl,
        category_id: categoryId,
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

    createNotification(
      "Subcategory updated",
      `${subcategory.title} has some new changes`,
      subcategory.panel_user?.fullname!
    );

    return subcategory;
  }

  public async deleteSubcategory(id: string, panelUserId: string) {
    await this.prismaClient.subcategory.update({
      where: {
        id,
      },
      data: {
        panel_user_id: panelUserId,
      },
    });

    const subcategory = await this.prismaClient.subcategory.delete({
      where: {
        id,
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

    if (subcategory.image && subcategory.image.includes("cloudinary")) {
      try {
        const publicId = subcategory.image.split("/").pop()?.split(".")[0];
        await cloudinary.uploader.destroy(publicId!);
      } catch (error) {
        console.log("Error deleting from cloudinary");
      }
    }

    createNotification(
      "Subcategory delete",
      `${subcategory.title} has been deleted permanently`,
      subcategory.panel_user?.fullname!
    );

    return subcategory;
  }
}

export default Subcategory;
