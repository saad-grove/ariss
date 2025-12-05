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
exports.unreleaseProductController = exports.releaseProductController = exports.deleteProductController = exports.fetchAllProductsController = exports.addProductController = void 0;
const Product_1 = __importDefault(require("../services/Product"));
const productServices = new Product_1.default();
const addProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, price, quantity, description, img1, img2, img3, img4, subcategoryId, panelUserId, } = req.body;
    const data = {
        title,
        price,
        quantity,
        description,
        img1,
        img2,
        subcategoryId,
        panelUserId,
    };
    if (!data) {
        return res.status(404).json({ message: "Missing fields are required" });
    }
    try {
        const product = yield productServices.addProduct(title, price, quantity, description, img1, img2, img3, img4, subcategoryId, panelUserId);
        res.status(201).json({ message: "Product added", data: product });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error.message);
    }
});
exports.addProductController = addProductController;
const fetchAllProductsController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productServices.fetchAllProducts();
        res.status(200).json({ total: product.length, data: product });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error.message);
    }
});
exports.fetchAllProductsController = fetchAllProductsController;
const deleteProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, panelId } = req.params;
    if (!id || !panelId) {
        return res
            .status(404)
            .json({ message: "Id or Panel Id is missing from params or is invalid" });
    }
    try {
        const product = yield productServices.deleteProduct(id, panelId);
        res.status(200).json({ message: "Product deleted", data: product });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error.message);
    }
});
exports.deleteProductController = deleteProductController;
const releaseProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, panelUserId } = req.params;
    if (!id || !panelUserId) {
        res.status(404).json({ message: "Id or Panel Id is invalid" });
    }
    try {
        const product = yield productServices.releaseProduct(id, panelUserId);
        res.status(200).json({ message: "Product released", data: product });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error.message);
    }
});
exports.releaseProductController = releaseProductController;
const unreleaseProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, panelUserId } = req.params;
    if (!id || !panelUserId) {
        res.status(404).json({ message: "Id or Panel Id is invalid" });
    }
    try {
        const product = yield productServices.unreleaseProduct(id, panelUserId);
        res.status(200).json({ message: "Product unreleased", data: product });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error.message);
    }
});
exports.unreleaseProductController = unreleaseProductController;
