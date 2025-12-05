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
const db_1 = __importDefault(require("../../lib/db"));
const uuid_1 = require("uuid");
const Notification_1 = require("./Notification");
const cloudinary_1 = __importDefault(require("../../lib/cloudinary"));
class Category {
    constructor(prismaClient = db_1.default) {
        this.prismaClient = prismaClient;
    }
    addCategory(title, description, image, panelUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const exisiting = yield this.prismaClient.category.findUnique({
                where: {
                    title,
                },
            });
            if (exisiting)
                throw new Error("Category already exists");
            const uploaderImage = cloudinary_1.default.uploader.upload(image);
            const imageUrl = (yield uploaderImage).secure_url;
            const category = yield this.prismaClient.category.create({
                data: {
                    id: `category-${(0, uuid_1.v4)()}`,
                    title,
                    description,
                    image: imageUrl,
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
            (0, Notification_1.createNotification)("Category added", `New ${category.title} added to the stocks`, (_a = category.panel_user) === null || _a === void 0 ? void 0 : _a.fullname);
            return category;
        });
    }
    getAllCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaClient.category.findMany();
        });
    }
    getSingleCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.prismaClient.category.findUnique({
                where: {
                    id,
                },
            });
            if (!category)
                throw new Error("Category do not exist");
            return category;
        });
    }
    updateCategory(id, title, description, image, panelUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const exisiting = yield this.prismaClient.category.findUnique({
                where: {
                    id,
                },
            });
            if (!exisiting)
                throw new Error("Category do not exist");
            const uploaderImage = cloudinary_1.default.uploader.upload(image);
            const imageUrl = (yield uploaderImage).secure_url;
            const category = yield this.prismaClient.category.update({
                where: {
                    id,
                },
                data: {
                    title,
                    description,
                    image: imageUrl,
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
            (0, Notification_1.createNotification)("Category updated", `${category.title} has some new changes`, (_a = category.panel_user) === null || _a === void 0 ? void 0 : _a.fullname);
            return category;
        });
    }
    deleteCategory(id, panelUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            yield this.prismaClient.category.update({
                where: {
                    id,
                },
                data: {
                    panel_user_id: panelUserId,
                },
            });
            const category = yield this.prismaClient.category.delete({
                where: {
                    id,
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
            if (category.image && category.image.includes("cloudinary")) {
                try {
                    const publicId = (_a = category.image.split("/").pop()) === null || _a === void 0 ? void 0 : _a.split(".")[0];
                    yield cloudinary_1.default.uploader.destroy(publicId);
                }
                catch (error) {
                    console.log("Error deleting from cloudinary");
                }
            }
            yield (0, Notification_1.createNotification)("Category delete", `${category.title} has been deleted permanently`, (_b = category.panel_user) === null || _b === void 0 ? void 0 : _b.fullname);
            return category;
        });
    }
}
exports.default = Category;
