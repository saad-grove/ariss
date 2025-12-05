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
const cloudinary_1 = __importDefault(require("../../lib/cloudinary"));
class Product {
    constructor(prismaClient = db_1.default) {
        this.prismaClient = prismaClient;
    }
    addProduct(title, price, quantity, description, img1, img2, img3, img4, subcategoryId, panelUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const existing = yield this.prismaClient.product.findUnique({
                where: {
                    title,
                },
            });
            if (existing)
                throw new Error("Product already exist");
            const uploaderImage1 = cloudinary_1.default.uploader.upload(img1);
            const imageUrl1 = (yield uploaderImage1).secure_url;
            const uploaderImage2 = cloudinary_1.default.uploader.upload(img2);
            const imageUrl2 = (yield uploaderImage2).secure_url;
            const uploaderImage3 = cloudinary_1.default.uploader.upload(img3);
            const imageUrl3 = (yield uploaderImage3).secure_url;
            const uploaderImage4 = cloudinary_1.default.uploader.upload(img4);
            const imageUrl4 = (yield uploaderImage4).secure_url;
            const product = yield this.prismaClient.product.create({
                data: {
                    id: `prod-${(0, uuid_1.v4)()}`,
                    title,
                    price,
                    quantity,
                    description,
                    img1: imageUrl1 || img1,
                    img2: imageUrl2 || img2,
                    img3: imageUrl3 || img3,
                    img4: imageUrl4 || img4,
                    subcategory_id: subcategoryId,
                    panel_user_id: panelUserId,
                },
                include: {
                    subcategory: {
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
            yield (0, Notification_1.createNotification)("Product added", `New product ${product.title} has been added under subcategory ${(_a = product.subcategory) === null || _a === void 0 ? void 0 : _a.title}`, (_b = product.panel_user) === null || _b === void 0 ? void 0 : _b.fullname);
            return product;
        });
    }
    fetchAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaClient.product.findMany({
                orderBy: {
                    created_at: "desc",
                },
                include: {
                    subcategory: {
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
        });
    }
    deleteProduct(id, panelUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield this.prismaClient.product.update({
                where: {
                    id,
                },
                data: {
                    panel_user_id: panelUserId,
                },
            });
            const product = yield this.prismaClient.product.delete({
                where: {
                    id,
                },
                include: {
                    panel_user: {
                        select: {
                            fullname: true,
                        },
                    },
                },
            });
            // if (product.img1 && product.img1.includes("cloudinary")) {
            //   try {
            //     const publicId = product.img1.split("/").pop()?.split(".")[0];
            //     await cloudinary.uploader.destroy(publicId!);
            //   } catch (error) {
            //     console.log("Error deleting from cloudinary");
            //   }
            // }
            // if (product.img2 && product.img2.includes("cloudinary")) {
            //   try {
            //     const publicId = product.img2.split("/").pop()?.split(".")[0];
            //     await cloudinary.uploader.destroy(publicId!);
            //   } catch (error) {
            //     console.log("Error deleting from cloudinary");
            //   }
            // }
            // if (product.img3 && product.img3.includes("cloudinary")) {
            //   try {
            //     const publicId = product.img3.split("/").pop()?.split(".")[0];
            //     await cloudinary.uploader.destroy(publicId!);
            //   } catch (error) {
            //     console.log("Error deleting from cloudinary");
            //   }
            // }
            // if (product.img4 && product.img4.includes("cloudinary")) {
            //   try {
            //     const publicId = product.img4.split("/").pop()?.split(".")[0];
            //     await cloudinary.uploader.destroy(publicId!);
            //   } catch (error) {
            //     console.log("Error deleting from cloudinary");
            //   }
            // }
            yield (0, Notification_1.createNotification)("Product delete", `Product ${product.title} was permanently deleted`, (_a = product === null || product === void 0 ? void 0 : product.panel_user) === null || _a === void 0 ? void 0 : _a.fullname);
            return product;
        });
    }
    releaseProduct(id, panelUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = this.prismaClient.product.update({
                where: {
                    id,
                },
                data: {
                    is_public: true,
                    panel_user_id: panelUserId,
                },
                include: {
                    panel_user: {
                        select: {
                            fullname: true,
                        },
                    },
                },
            });
            yield (0, Notification_1.createNotification)("Product released", `Product ${(yield product).title} has been released to customers`, null);
            return product;
        });
    }
    unreleaseProduct(id, panelUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = this.prismaClient.product.update({
                where: {
                    id,
                },
                data: {
                    is_public: false,
                    panel_user_id: panelUserId,
                },
            });
            yield (0, Notification_1.createNotification)("Product unreleased", `Product ${(yield product).title} has been hidden from customers`, null);
            return product;
        });
    }
}
exports.default = Product;
