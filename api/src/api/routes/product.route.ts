import { Router } from "express";
import * as productControllers from "../controllers/product.controller";

const productRouter = Router();

productRouter.post("/add", productControllers.addProductController);

productRouter.get("/all", productControllers.fetchAllProductsController);

productRouter.patch(
  "/release/:id/:panelUserId",
  productControllers.releaseProductController
);
productRouter.patch(
  "/unrelease/:id/:panelUserId",
  productControllers.unreleaseProductController
);

productRouter.delete(
  "/delete/:id/:panelId",
  productControllers.deleteProductController
);

export default productRouter;
