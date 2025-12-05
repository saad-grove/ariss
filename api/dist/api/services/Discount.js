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
const Notification_1 = require("./Notification");
class Discount {
    constructor(prismaClient = db_1.default) {
        this.prismaClient = prismaClient;
    }
    addDiscount(expiryDate, discountedPrice, customerId, productId, panelUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const discount = yield this.prismaClient.discount.create({
                data: {
                    coupon_code: `coupon-${(0, uuid_1.v4)()}`,
                    expiry_date: expiryDate,
                    discounted_price: discountedPrice,
                    customer_id: customerId,
                    product_id: productId,
                    panel_user_id: panelUserId,
                },
                include: {
                    customer: {
                        select: {
                            business: true,
                        },
                    },
                    product: {
                        select: {
                            title: true,
                        },
                    },
                    panel_user: {
                        select: {
                            fullname: true,
                        },
                    },
                },
            });
            yield (0, Notification_1.createNotification)("Discount assigned", `Discount has been assigned to ${(_a = discount.customer) === null || _a === void 0 ? void 0 : _a.business} on product ${discount.product.title}`, (_b = discount.panel_user) === null || _b === void 0 ? void 0 : _b.fullname);
            return discount;
        });
    }
}
exports.default = Discount;
