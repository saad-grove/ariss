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
class Subcategory {
    constructor(prismaClient = db_1.default) {
        this.prismaClient = prismaClient;
    }
    addSubcategory(title, description, image, categoryId, panelUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const exisiting = yield this.prismaClient.subcategory.findUnique({
                where: {
                    title,
                },
            });
            if (exisiting)
                throw new Error("Subcategory already exists");
            const uploaderImage = cloudinary_1.default.uploader.upload(image);
            const imageUrl = (yield uploaderImage).secure_url;
            const subcategory = yield this.prismaClient.subcategory.create({
                data: {
                    id: `subcategory-${(0, uuid_1.v4)()}`,
                    title,
                    description,
                    image: imageUrl,
                    category_id: categoryId,
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
            (0, Notification_1.createNotification)("Subcategory added", `New ${subcategory.title} added to the stocks`, (_a = subcategory.panel_user) === null || _a === void 0 ? void 0 : _a.fullname);
            return subcategory;
        });
    }
    getAllSubcategory() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaClient.subcategory.findMany({
                include: {
                    category: {
                        select: {
                            title: true,
                        },
                    },
                },
                orderBy: {
                    created_at: "desc",
                },
            });
        });
    }
    getSingleSubcategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const subcategory = yield this.prismaClient.subcategory.findUnique({
                where: {
                    id,
                },
                include: {
                    category: {
                        select: {
                            title: true,
                        },
                    },
                },
            });
            if (!subcategory)
                throw new Error("Subcategory do not exist");
            return subcategory;
        });
    }
    updateSubcategory(id, title, description, image, categoryId, panelUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const exisiting = yield this.prismaClient.subcategory.findUnique({
                where: {
                    id,
                },
            });
            if (!exisiting)
                throw new Error("Subcategory do not exist");
            const uploaderImage = cloudinary_1.default.uploader.upload(image);
            const imageUrl = (yield uploaderImage).secure_url;
            const subcategory = yield this.prismaClient.subcategory.update({
                where: {
                    id,
                },
                data: {
                    title,
                    description,
                    image: imageUrl,
                    category_id: categoryId,
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
            (0, Notification_1.createNotification)("Subcategory updated", `${subcategory.title} has some new changes`, (_a = subcategory.panel_user) === null || _a === void 0 ? void 0 : _a.fullname);
            return subcategory;
        });
    }
    deleteSubcategory(id, panelUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            yield this.prismaClient.subcategory.update({
                where: {
                    id,
                },
                data: {
                    panel_user_id: panelUserId,
                },
            });
            const subcategory = yield this.prismaClient.subcategory.delete({
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
            if (subcategory.image && subcategory.image.includes("cloudinary")) {
                try {
                    const publicId = (_a = subcategory.image.split("/").pop()) === null || _a === void 0 ? void 0 : _a.split(".")[0];
                    yield cloudinary_1.default.uploader.destroy(publicId);
                }
                catch (error) {
                    console.log("Error deleting from cloudinary");
                }
            }
            (0, Notification_1.createNotification)("Subcategory delete", `${subcategory.title} has been deleted permanently`, (_b = subcategory.panel_user) === null || _b === void 0 ? void 0 : _b.fullname);
            return subcategory;
        });
    }
}
exports.default = Subcategory;
