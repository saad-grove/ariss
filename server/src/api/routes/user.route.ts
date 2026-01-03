import { Router } from "express";
import * as userController from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/register/dealer", userController.registerDealerController);

export default userRouter;
