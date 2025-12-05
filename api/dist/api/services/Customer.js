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
const uuid_1 = require("uuid");
const db_1 = __importDefault(require("../../lib/db"));
const generate_token_1 = require("../../lib/generate-token");
const OTP_1 = require("./OTP");
const client_1 = require("@prisma/client");
const Notification_1 = require("./Notification");
class Customer {
    constructor(prismaClient = db_1.default) {
        this.prismaClient = prismaClient;
    }
    registerOwner(email, phone, name, gstin, business, shippingAddress, billingAddress, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield this.prismaClient.customer.findUnique({
                where: {
                    email,
                },
            });
            if (existing)
                throw new Error("Business owner account already exist");
            if (!(yield (0, OTP_1.verifyOTP)(email, otp))) {
                console.error("Invalid OTP");
                throw new Error("Invalid or expired OTP");
            }
            const owner = yield this.prismaClient.customer.create({
                data: {
                    id: `dealer-${(0, uuid_1.v4)()}`,
                    email,
                    phone,
                    name,
                    role: client_1.CustomerType.DEALER,
                    gstin,
                    business,
                    shipping_address: shippingAddress,
                    billing_address: billingAddress,
                },
            });
            yield (0, Notification_1.createNotification)("Dealer account registration", `New ${owner.business} is waiting for your approval`, null);
            // await waitForApproval(email);
            return owner;
        });
    }
    loginUser(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prismaClient.customer.findUnique({
                where: {
                    email,
                },
            });
            if (!user)
                throw new Error("User not found");
            if (!(yield (0, OTP_1.verifyOTP)(email, otp))) {
                console.error("Invalid OTP");
                throw new Error("Invalid or expired OTP");
            }
            const token = (0, generate_token_1.generateToken)(user.id);
            return { user, token };
        });
    }
    getProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaClient.customer.findUnique({
                where: {
                    id: userId,
                },
            });
        });
    }
}
exports.default = Customer;
