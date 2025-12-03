import prisma from "../../lib/db";
import { v4 as uuid } from "uuid";

class Notification {
  private prismaClient;

  constructor(prismaClient = prisma) {
    this.prismaClient = prismaClient;
  }

  public async fetchAllNotifications() {
    return await this.prismaClient.notification.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
  }

  public async fetchAllReadNotifications() {
    return await this.prismaClient.notification.findMany({
      where: {
        is_read: true,
      },
      orderBy: {
        created_at: "asc",
      },
    });
  }

  public async fetchAllUnreadReadNotifications() {
    return await this.prismaClient.notification.findMany({
      where: {
        is_read: false,
      },
      orderBy: {
        created_at: "asc",
      },
    });
  }

  public async readNotification(id: string) {
    const existingNotification =
      await this.prismaClient.notification.findUnique({
        where: {
          id,
        },
      });

    if (!existingNotification) throw new Error("Notification do not exist");

    return await this.prismaClient.notification.update({
      where: {
        id,
      },
      data: {
        is_read: true,
      },
    });
  }

  public async deleteAllNotification() {
    return await this.prismaClient.notification.deleteMany();
  }
}

export const createNotification = async (
  title: string,
  description: string,
  author: string | null
) => {
  return await prisma.notification.create({
    data: {
      id: `notification-${uuid()}`,
      title,
      description,
      author,
    },
  });
};

export default Notification;
