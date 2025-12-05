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
exports.disapproveOwnerController = exports.approveOwnerController = exports.deleteCustomerController = exports.updateOwnerAddressController = exports.fetchAllNonApprovedController = exports.fetchAllApprovedController = exports.registerOwnerController = void 0;
const BusinessOwner_1 = __importDefault(require("../services/BusinessOwner"));
const businessOwnerServices = new BusinessOwner_1.default();
const registerOwnerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phone, name, gstin, business, shippingAddress, billingAddress, otp, } = req.body;
    if (!email ||
        !phone ||
        !name ||
        !gstin ||
        !business ||
        !shippingAddress ||
        !billingAddress) {
        res.status(500);
        console.log("All fields are required");
    }
    try {
        const owner = yield businessOwnerServices.registerOwner(email, phone, name, gstin, business, shippingAddress, billingAddress, otp);
        res
            .status(201)
            .json({ message: "Business account has been registered", data: owner });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.registerOwnerController = registerOwnerController;
const fetchAllApprovedController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const owner = yield businessOwnerServices.fetchAllApproved();
        res.status(200).json({ total: owner.length, data: owner });
    }
    catch (error) {
        res.status(500);
        console.log("There was an error fetching users", error.message);
    }
});
exports.fetchAllApprovedController = fetchAllApprovedController;
const fetchAllNonApprovedController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const owner = yield businessOwnerServices.fetchAllNonApproved();
        res.status(200).json({ total: owner.length, data: owner });
    }
    catch (error) {
        res.status(500);
        console.log("There was an error fetching users", error.message);
    }
});
exports.fetchAllNonApprovedController = fetchAllNonApprovedController;
const updateOwnerAddressController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const { billingAddress, shippingAddress } = req.body;
    if (!email) {
        res.status(404);
        console.log("Email not found in params");
    }
    if (!billingAddress || !shippingAddress) {
        res.status(500);
        console.log("Billing and Shipping address are missing keys or values");
    }
    try {
        const owner = yield businessOwnerServices.updateOwnerAddress(shippingAddress, billingAddress, email);
        res.status(200).json({ message: "Business address updated", data: owner });
    }
    catch (error) {
        res.status(400);
        console.log("There was an error updating address", error.message);
    }
});
exports.updateOwnerAddressController = updateOwnerAddressController;
const deleteCustomerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    if (!email) {
        res.status(404);
        console.log("Email not found in params");
    }
    try {
        const owner = yield businessOwnerServices.deleteCustomer(email);
        res.status(200).json({ message: `Business ${owner.business} deleted` });
    }
    catch (error) {
        res.status(400);
        console.log("There was an error updating address", error.message);
    }
});
exports.deleteCustomerController = deleteCustomerController;
const approveOwnerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    if (!email) {
        return res.status(404).json({ message: "Email not found in params" });
    }
    try {
        const customer = yield businessOwnerServices.approveOwner(email);
        res.status(200).json({ message: "Dealer approved", data: customer });
    }
    catch (error) {
        res.status(400);
        console.log("There was an error approving dealer", error.message);
    }
});
exports.approveOwnerController = approveOwnerController;
const disapproveOwnerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    if (!email) {
        return res.status(404).json({ message: "Email not found in params" });
    }
    try {
        const customer = yield businessOwnerServices.disapproveOwner(email);
        res.status(200).json({ message: "Dealer disapproved", data: customer });
    }
    catch (error) {
        res.status(400);
        console.log("There was an error disapproving dealer", error.message);
    }
});
exports.disapproveOwnerController = disapproveOwnerController;
