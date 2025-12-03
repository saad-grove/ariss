import { Router } from "express";
import * as subcategoryControllers from "../controllers/subcategory.controller";

const subcategoryRouter = Router();

subcategoryRouter.post("/add", subcategoryControllers.addSubcategoryController);

subcategoryRouter.get(
  "/all",
  subcategoryControllers.getAllSubcategoryController
);
subcategoryRouter.get(
  "/:id",
  subcategoryControllers.getSingleSubcategoryController
);

subcategoryRouter.put(
  "/update/:id",
  subcategoryControllers.updateSubcategoryController
);

subcategoryRouter.delete(
  "/delete/:id/:panelId",
  subcategoryControllers.deleteSubcategoryController
);

export default subcategoryRouter;
