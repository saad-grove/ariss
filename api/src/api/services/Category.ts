import prisma from "../../lib/db";
import { v4 as uuid } from "uuid";
import { createNotification } from "./Notification";
import cloudinary from "../../lib/cloudinary";

class Category {
  private prismaClient;

  constructor(prismaClient = prisma) {
    this.prismaClient = prismaClient;
  }

  public async addCategory(
    title: string,
    description: string,
    image: string,
    panelUserId: string
  ) {
    const exisiting = await this.prismaClient.category.findUnique({
      where: {
        title,
      },
    });

    if (exisiting) throw new Error("Category already exists");

    const uploaderImage = cloudinary.uploader.upload(image);
    const imageUrl = (await uploaderImage).secure_url;

    const category = await this.prismaClient.category.create({
      data: {
        id: `category-${uuid()}`,
        title,
        description,
        image: imageUrl,
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
      "Category added",
      `New ${category.title} added to the stocks`,
      category.panel_user?.fullname!
    );

    return category;
  }

  public async getAllCategory() {
    return await this.prismaClient.category.findMany();
  }

  public async getSingleCategory(id: string) {
    const category = await this.prismaClient.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) throw new Error("Category do not exist");

    return category;
  }

  public async updateCategory(
    id: string,
    title: string,
    description: string,
    image: any,
    panelUserId: string
  ) {
    const exisiting = await this.prismaClient.category.findUnique({
      where: {
        id,
      },
    });

    if (!exisiting) throw new Error("Category do not exist");

    const uploaderImage = cloudinary.uploader.upload(image);
    const imageUrl = (await uploaderImage).secure_url;

    const category = await this.prismaClient.category.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        image: imageUrl,
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
      "Category updated",
      `${category.title} has some new changes`,
      category.panel_user?.fullname!
    );

    return category;
  }

  public async deleteCategory(id: string, panelUserId: string) {
    await this.prismaClient.category.update({
      where: {
        id,
      },
      data: {
        panel_user_id: panelUserId,
      },
    });

    const category = await this.prismaClient.category.delete({
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

    if (category.image && category.image.includes("cloudinary")) {
      try {
        const publicId = category.image.split("/").pop()?.split(".")[0];
        await cloudinary.uploader.destroy(publicId!);
      } catch (error) {
        console.log("Error deleting from cloudinary");
      }
    }

    await createNotification(
      "Category delete",
      `${category.title} has been deleted permanently`,
      category.panel_user?.fullname!
    );

    return category;
  }
}

export default Category;
