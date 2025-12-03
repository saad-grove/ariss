import { Router } from "express";
import categoryRouter from "./category.route";
import subcategoryRouter from "./subcategory.route";
import productRouter from "./product.route";

const stockRouter = Router();

stockRouter.use("/category", categoryRouter);
stockRouter.use("/subcategory", subcategoryRouter);
stockRouter.use("/product", productRouter);

export default stockRouter;
