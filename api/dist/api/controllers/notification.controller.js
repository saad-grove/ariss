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
exports.deleteAllNotificationsController = exports.readNotificationController = exports.fetchAllUnreadNotificationsController = exports.fetchAllReadNotificationsController = exports.fetchAllNotificationsController = void 0;
const Notification_1 = __importDefault(require("../services/Notification"));
const notificationServices = new Notification_1.default();
const fetchAllNotificationsController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = yield notificationServices.fetchAllNotifications();
        res.status(200).json({ total: notification.length, data: notification });
    }
    catch (error) {
        console.log("Error fetching all notifications");
        res.status(500).json({ message: error.message });
    }
});
exports.fetchAllNotificationsController = fetchAllNotificationsController;
const fetchAllReadNotificationsController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = yield notificationServices.fetchAllReadNotifications();
        res.status(200).json({ total: notification.length, data: notification });
    }
    catch (error) {
        console.log("Error fetching all read notifications");
        res.status(500).json({ message: error.message });
    }
});
exports.fetchAllReadNotificationsController = fetchAllReadNotificationsController;
const fetchAllUnreadNotificationsController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = yield notificationServices.fetchAllUnreadReadNotifications();
        res.status(200).json({ total: notification.length, data: notification });
    }
    catch (error) {
        console.log("Error fetching all unread notifications");
        res.status(500).json({ message: error.message });
    }
});
exports.fetchAllUnreadNotificationsController = fetchAllUnreadNotificationsController;
const readNotificationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        console.log("Notification ID not found in params");
        return res
            .status(404)
            .json({ message: "Notification ID not found in params" });
    }
    try {
        const notification = yield notificationServices.readNotification(id);
        res
            .status(200)
            .json({ message: "Notification updated", data: notification });
    }
    catch (error) {
        console.log("Failed to read the notification");
        res.status(400).json({ message: error.message });
    }
});
exports.readNotificationController = readNotificationController;
const deleteAllNotificationsController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = yield notificationServices.deleteAllNotification();
        res.status(200).json({ total: notification.count, data: notification });
        console.log("All notifications deleted");
    }
    catch (error) {
        console.log("Error deleting all notifications");
        res.status(500).json({ message: error.message });
    }
});
exports.deleteAllNotificationsController = deleteAllNotificationsController;
