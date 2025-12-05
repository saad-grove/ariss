"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_route_1 = __importDefault(require("./notification.route"));
const panel_user_route_1 = __importDefault(require("./panel-user.route"));
const stock_route_1 = __importDefault(require("./stock.route"));
const business_route_1 = __importDefault(require("./business.route"));
const otp_route_1 = __importDefault(require("./otp.route"));
const mainRouter = (0, express_1.Router)();
mainRouter.use("/notification", notification_route_1.default);
mainRouter.use("/panel-user", panel_user_route_1.default);
mainRouter.use("/stock", stock_route_1.default);
mainRouter.use("/otp", otp_route_1.default);
mainRouter.use("/customer", business_route_1.default);
exports.default = mainRouter;
