import { Router } from "express";
import * as employeeControllers from "../controllers/business.employee.controller";

const businessEmployeeRouter = Router();

businessEmployeeRouter.post(
  "/register",
  employeeControllers.registerEmployeeController
);

businessEmployeeRouter.get(
  "/technician/all",
  employeeControllers.getAllTechniciansController
);
businessEmployeeRouter.get(
  "/backoffice/all",
  employeeControllers.getAllBackofficeController
);

export default businessEmployeeRouter;
