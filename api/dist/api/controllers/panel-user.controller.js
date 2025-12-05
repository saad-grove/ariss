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
exports.fetchAllEmployeeController = exports.fetchAllAdminController = exports.fetchAllPanelUsersController = exports.registerPanelUserController = void 0;
const PanelUser_1 = __importDefault(require("../services/PanelUser"));
const panelUserServices = new PanelUser_1.default();
const registerPanelUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clerkId, email, fullname, role } = req.body;
    if (!clerkId || !email || !fullname || !role) {
        console.log("All required fields are missing key or values");
        return res
            .status(500)
            .json({ message: "All required fields are missing key or values" });
    }
    try {
        const panelUser = yield panelUserServices.registerPanelUser(clerkId, email, fullname, role);
        res
            .status(201)
            .json({ message: "Panel user added to db", data: panelUser });
        console.log("Panel user added to db");
    }
    catch (error) {
        console.log("Error registering the panel user");
        res
            .status(400)
            .json({ message: `${error.message} or panel user already exists` });
    }
});
exports.registerPanelUserController = registerPanelUserController;
const fetchAllPanelUsersController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const panelUser = yield panelUserServices.fetchAllPanelUsers();
        res.status(200).json({ total: panelUser.length, data: panelUser });
    }
    catch (error) {
        console.log("Error fetching all the panel users");
        res.status(500).json({ message: error.message });
    }
});
exports.fetchAllPanelUsersController = fetchAllPanelUsersController;
const fetchAllAdminController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const panelUser = yield panelUserServices.fetchAllAdmin();
        res.status(200).json({ total: panelUser.length, data: panelUser });
    }
    catch (error) {
        console.log("Error fetching all the admin users");
        res.status(500).json({ message: error.message });
    }
});
exports.fetchAllAdminController = fetchAllAdminController;
const fetchAllEmployeeController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const panelUser = yield panelUserServices.fetchAllEmployee();
        res.status(200).json({ total: panelUser.length, data: panelUser });
    }
    catch (error) {
        console.log("Error fetching all the employee users");
        res.status(500).json({ message: error.message });
    }
});
exports.fetchAllEmployeeController = fetchAllEmployeeController;
