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
exports.getAllBackofficeController = exports.getAllTechniciansController = exports.registerEmployeeController = void 0;
const BusinessEmployee_1 = __importDefault(require("../services/BusinessEmployee"));
const businessEmployee = new BusinessEmployee_1.default();
const registerEmployeeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phone, name, role, dealerId, otp } = req.body;
    const data = { email, phone, name, role, dealerId, otp };
    if (!data) {
        return res.status(500).json({ message: "Fields are missing" });
    }
    try {
        const employee = yield businessEmployee.registerEmployee(email, phone, name, role, dealerId, otp);
        res.status(201).json({
            message: `${employee.role} account has registered`,
            data: employee,
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.registerEmployeeController = registerEmployeeController;
const getAllTechniciansController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee = yield businessEmployee.getAllTechnicians();
        res.status(200).json({ total: employee.length, data: employee });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllTechniciansController = getAllTechniciansController;
const getAllBackofficeController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee = yield businessEmployee.getAllBackoffice();
        res.status(200).json({ total: employee.length, data: employee });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllBackofficeController = getAllBackofficeController;
