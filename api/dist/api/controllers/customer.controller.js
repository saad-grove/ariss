"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileController = exports.loginUserController = exports.registerOwnerController = void 0;
const Customer_1 = __importDefault(require("../services/Customer"));
const customerServices = new Customer_1.default();
const registerOwnerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phone, name, gstin, business, shippingAddress, billingAddress, otp, } = req.body;
    if (!email ||
        !phone ||
        !name ||
        !gstin ||
        !business ||
        !shippingAddress ||
        !billingAddress) {
        res.status(500);
        console.log("All fields are required");
    }
    try {
        const owner = yield customerServices.registerOwner(email, phone, name, gstin, business, shippingAddress, billingAddress, otp);
        res
            .status(201)
            .json({ message: "Business account has been registered", data: owner });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.registerOwnerController = registerOwnerController;
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    try {
        const { user, token } = yield customerServices.loginUser(email, otp);
        res
            .status(200)
            .json({ message: "Logged In", user: user.name, token: token });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.loginUserController = loginUserController;
const getProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized: No user found" });
            return;
        }
        const user = yield customerServices.getProfile(req.user.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
});
exports.getProfileController = getProfileController;
