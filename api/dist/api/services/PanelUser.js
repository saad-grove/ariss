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
const client_1 = require("@prisma/client");
const db_1 = __importDefault(require("../../lib/db"));
const Notification_1 = require("./Notification");
class PanelUser {
    constructor(prismaClient = db_1.default) {
        this.prismaClient = prismaClient;
    }
    registerPanelUser(id, email, fullname, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const exisitingUser = yield this.prismaClient.panelUser.findUnique({
                where: {
                    email,
                },
            });
            if (exisitingUser)
                throw new Error("Panel user with this account already exists.");
            const panelUser = yield this.prismaClient.panelUser.create({
                data: {
                    id,
                    email,
                    fullname,
                    role,
                },
            });
            yield (0, Notification_1.createNotification)("Panel User", `New ${panelUser.fullname} ${panelUser.role.toLowerCase()} has been registered to panel`, null);
            return panelUser;
        });
    }
    fetchAllPanelUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaClient.panelUser.findMany({
                orderBy: {
                    created_at: "desc",
                },
            });
        });
    }
    fetchAllAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaClient.panelUser.findMany({
                where: {
                    role: client_1.PanelUserType.ADMIN,
                },
                orderBy: {
                    created_at: "desc",
                },
            });
        });
    }
    fetchAllEmployee() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaClient.panelUser.findMany({
                where: {
                    role: client_1.PanelUserType.EMPLOYEE,
                },
                orderBy: {
                    created_at: "desc",
                },
            });
        });
    }
}
exports.default = PanelUser;
