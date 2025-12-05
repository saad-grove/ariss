"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const otp_controller_1 = require("../controllers/otp.controller");
const otpRouter = (0, express_1.Router)();
otpRouter.post("/", otp_controller_1.sendOTPController);
exports.default = otpRouter;
