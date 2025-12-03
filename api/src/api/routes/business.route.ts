import { Router } from "express";
import businessOwnerRouter from "./owner.route";
import businessEmployeeRouter from "./employee.route";
import { deleteCustomerController } from "../controllers/business.owner.controller";

const businessRouter = Router();

businessRouter.use("/owner", businessOwnerRouter);
businessRouter.use("/employee", businessEmployeeRouter);

businessRouter.use("/remove/:email", deleteCustomerController);

export default businessRouter;
