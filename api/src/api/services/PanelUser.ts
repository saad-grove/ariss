import { PanelUserType } from "@prisma/client";
import prisma from "../../lib/db";
import { createNotification } from "./Notification";

class PanelUser {
  private prismaClient;

  constructor(prismaClient = prisma) {
    this.prismaClient = prismaClient;
  }

  public async registerPanelUser(
    id: string,
    email: string,
    fullname: string,
    role: PanelUserType
  ) {
    const exisitingUser = await this.prismaClient.panelUser.findUnique({
      where: {
        email,
      },
    });

    if (exisitingUser)
      throw new Error("Panel user with this account already exists.");

    const panelUser = await this.prismaClient.panelUser.create({
      data: {
        id,
        email,
        fullname,
        role,
      },
    });

    await createNotification(
      "Panel User",
      `New ${
        panelUser.fullname
      } ${panelUser.role.toLowerCase()} has been registered to panel`,
      null
    );

    return panelUser;
  }

  public async fetchAllPanelUsers() {
    return await this.prismaClient.panelUser.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
  }

  public async fetchAllAdmin() {
    return await this.prismaClient.panelUser.findMany({
      where: {
        role: PanelUserType.ADMIN,
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }

  public async fetchAllEmployee() {
    return await this.prismaClient.panelUser.findMany({
      where: {
        role: PanelUserType.EMPLOYEE,
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }
}

export default PanelUser;
