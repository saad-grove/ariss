import { Router } from "express";

import notificationRouter from "./notification.route";
import panelUserRouter from "./panel-user.route";
import stockRouter from "./stock.route";
import businessRouter from "./business.route";
import otpRouter from "./otp.route";

const mainRouter = Router();

mainRouter.use("/notification", notificationRouter);
mainRouter.use("/panel-user", panelUserRouter);
mainRouter.use("/stock", stockRouter);
mainRouter.use("/otp", otpRouter);
mainRouter.use("/customer", businessRouter);

export default mainRouter;
