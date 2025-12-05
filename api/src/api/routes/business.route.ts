import { Router } from "express";
import businessOwnerRouter from "./owner.route";
import businessEmployeeRouter from "./employee.route";
import { deleteCustomerController } from "../controllers/business.owner.controller";
import * as customerController from "../controllers/customer.controller";
import protectRoute from "../../middleware/auth.middleware";

const businessRouter = Router();

businessRouter.use("/owner", businessOwnerRouter);
businessRouter.use("/employee", businessEmployeeRouter);

businessRouter.use("/remove/:email", deleteCustomerController);

businessRouter.post("/register", customerController.registerOwnerController);
businessRouter.post("/login", customerController.loginUserController);

businessRouter.get(
  "/profile",
  protectRoute,
  customerController.getProfileController
);

export default businessRouter;
