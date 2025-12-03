import { Router } from "express";
import * as notificationControllers from "../controllers/notification.controller";

const notificationRouter = Router();

notificationRouter.get(
  "/all",
  notificationControllers.fetchAllNotificationsController
);
notificationRouter.get(
  "/read",
  notificationControllers.fetchAllReadNotificationsController
);
notificationRouter.get(
  "/unread",
  notificationControllers.fetchAllUnreadNotificationsController
);

notificationRouter.patch(
  "/read/:id",
  notificationControllers.readNotificationController
);

notificationRouter.delete(
  "/delete/all",
  notificationControllers.deleteAllNotificationsController
);

export default notificationRouter;
