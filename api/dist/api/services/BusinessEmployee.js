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
class BusinessEmployee {
    constructor(prismaClient = db_1.default) {
        this.prismaClient = prismaClient;
    }
    registerEmployee(email, phone, name, role, dealerId, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const existing = yield this.prismaClient.customer.findUnique({
                where: {
                    email,
                },
            });
            if (existing)
                throw new Error("User with this account already exist");
            if (!(yield (0, OTP_1.verifyOTP)(email, otp))) {
                console.error("Invalid OTP");
                throw new Error("Invalid or expired OTP");
            }
            const employee = yield this.prismaClient.customer.create({
                data: {
                    id: `${role.toLowerCase()}-${(0, uuid_1.v4)()}`,
                    phone,
                    email,
                    name,
                    role,
                    dealer_id: dealerId,
                },
                include: {
                    dealer_user: {
                        select: {
                            business: true,
                        },
                    },
                },
            });
            const lowered = employee.role.toLowerCase();
            const capitalized = lowered.charAt(0).toUpperCase() + lowered.slice(1);
            yield (0, Notification_1.createNotification)(`${capitalized} account registration`, `New ${capitalized} of ${(_a = employee.dealer_user) === null || _a === void 0 ? void 0 : _a.business} is waiting for approval`, null);
            // await waitForApprovalEmployee(email);
            return employee;
        });
    }
    getAllTechnicians() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaClient.customer.findMany({
                where: {
                    role: client_1.CustomerType.TECHNICIAN,
                },
            });
        });
    }
    getAllBackoffice() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaClient.customer.findMany({
                where: {
                    role: client_1.CustomerType.BACKOFFICE,
                },
            });
        });
    }
}
exports.default = BusinessEmployee;
