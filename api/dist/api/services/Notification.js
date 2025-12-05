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
exports.createNotification = void 0;
const db_1 = __importDefault(require("../../lib/db"));
const uuid_1 = require("uuid");
class Notification {
    constructor(prismaClient = db_1.default) {
        this.prismaClient = prismaClient;
    }
    fetchAllNotifications() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaClient.notification.findMany({
                orderBy: {
                    created_at: "desc",
                },
            });
        });
    }
    fetchAllReadNotifications() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaClient.notification.findMany({
                where: {
                    is_read: true,
                },
                orderBy: {
                    created_at: "asc",
                },
            });
        });
    }
    fetchAllUnreadReadNotifications() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaClient.notification.findMany({
                where: {
                    is_read: false,
                },
                orderBy: {
                    created_at: "asc",
                },
            });
        });
    }
    readNotification(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingNotification = yield this.prismaClient.notification.findUnique({
                where: {
                    id,
                },
            });
            if (!existingNotification)
                throw new Error("Notification do not exist");
            return yield this.prismaClient.notification.update({
                where: {
                    id,
                },
                data: {
                    is_read: true,
                },
            });
        });
    }
    deleteAllNotification() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaClient.notification.deleteMany();
        });
    }
}
const createNotification = (title, description, author) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.notification.create({
        data: {
            id: `notification-${(0, uuid_1.v4)()}`,
            title,
            description,
            author,
        },
    });
});
exports.createNotification = createNotification;
exports.default = Notification;
