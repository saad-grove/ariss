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
const OTP_1 = require("./OTP");
const client_1 = require("@prisma/client");
const Notification_1 = require("./Notification");
class BusinessOwner {
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
    fetchAllApproved() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaClient.customer.findMany({
                where: {
                    role: client_1.CustomerType.DEALER,
                    is_approved: true,
                },
            });
        });
    }
    fetchAllNonApproved() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaClient.customer.findMany({
                where: {
                    role: client_1.CustomerType.DEALER,
                    is_approved: false,
                },
            });
        });
    }
    updateOwnerAddress(shippingAddress, billingAddress, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield this.prismaClient.customer.findUnique({
                where: {
                    email,
                    role: client_1.CustomerType.DEALER,
                },
            });
            if (!existing)
                throw new Error("Business owner do not exist");
            const owner = yield this.prismaClient.customer.update({
                where: {
                    email,
                },
                data: {
                    shipping_address: shippingAddress,
                    billing_address: billingAddress,
                },
            });
            yield (0, Notification_1.createNotification)("Dealer address update", `${owner.business} has updated their address`, null);
            return owner;
        });
    }
    deleteCustomer(email) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const existing = yield this.prismaClient.customer.findUnique({
                where: {
                    email,
                },
                include: {
                    dealer_user: {
                        select: {
                            business: true,
                        },
                    },
                },
            });
            const owner = yield this.prismaClient.customer.delete({
                where: {
                    email,
                },
            });
            if (owner.role === "DEALER") {
                yield (0, Notification_1.createNotification)("Customer account deleted", `Dealer of ${existing === null || existing === void 0 ? void 0 : existing.business} has deleted their account`, null);
            }
            else if (owner.role === "TECHNICIAN") {
                yield (0, Notification_1.createNotification)("Customer account deleted", `Technician of ${(_a = existing === null || existing === void 0 ? void 0 : existing.dealer_user) === null || _a === void 0 ? void 0 : _a.business} has deleted their account`, null);
            }
            else {
                yield (0, Notification_1.createNotification)("Customer account deleted", `Backoffice of ${(_b = existing === null || existing === void 0 ? void 0 : existing.dealer_user) === null || _b === void 0 ? void 0 : _b.business} has deleted their account`, null);
            }
            // TODO: Create email notification
            return owner;
        });
    }
    approveOwner(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.prismaClient.customer.update({
                where: {
                    email,
                    is_approved: false,
                    role: client_1.CustomerType.DEALER,
                },
                data: {
                    is_approved: true,
                },
            });
            yield (0, Notification_1.createNotification)(`Business ${customer.role} approved`, `${customer.business} is approved to use the app`, null);
            return customer;
        });
    }
    disapproveOwner(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.prismaClient.customer.update({
                where: {
                    email,
                    is_approved: true,
                    role: client_1.CustomerType.DEALER,
                },
                data: {
                    is_approved: false,
                },
            });
            yield (0, Notification_1.createNotification)(`Business ${customer.role} approved`, `${customer.business} is approved to use the app`, null);
            return customer;
        });
    }
}
exports.default = BusinessOwner;
