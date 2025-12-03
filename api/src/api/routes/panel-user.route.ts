import { Router } from "express";
import * as panelUserControllers from "../controllers/panel-user.controller";

const panelUserRouter = Router();

panelUserRouter.post(
  "/register",
  panelUserControllers.registerPanelUserController
);

panelUserRouter.get("/all", panelUserControllers.fetchAllPanelUsersController);
panelUserRouter.get("/admin", panelUserControllers.fetchAllAdminController);
panelUserRouter.get(
  "/employee",
  panelUserControllers.fetchAllEmployeeController
);

export default panelUserRouter;
