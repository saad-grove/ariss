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
exports.deleteCategoryController = exports.updateCategoryController = exports.getSingleCategoryController = exports.getAllCategoryController = exports.addCategoryController = void 0;
const Category_1 = __importDefault(require("../services/Category"));
const categoryService = new Category_1.default();
const addCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, image, panelUserId } = req.body;
    const data = { title, description, image, panelUserId };
    if (!data) {
        return res.status(404).json({ message: "All fields are required" });
    }
    try {
        const category = yield categoryService.addCategory(title, description, image, panelUserId);
        res.status(201).json({ message: "Category added", data: category });
    }
    catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
});
exports.addCategoryController = addCategoryController;
const getAllCategoryController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield categoryService.getAllCategory();
        res.status(200).json({ total: category.length, data: category });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.getAllCategoryController = getAllCategoryController;
const getSingleCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const category = yield categoryService.getSingleCategory(id);
        res.status(200).json({ data: category });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.getSingleCategoryController = getSingleCategoryController;
const updateCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(404).json({ message: "ID not found" });
    }
    const { title, description, image, panelUserId } = req.body;
    const data = { title, description, image, panelUserId };
    if (!data) {
        return res.status(404).json({ message: "All fields are required" });
    }
    try {
        const category = yield categoryService.updateCategory(id, title, description, image, panelUserId);
        res.status(200).json({ message: "Category updated", data: category });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.updateCategoryController = updateCategoryController;
const deleteCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, panelId } = req.params;
    if (!id || !panelId) {
        return res.status(404).json({ message: "IDs not found" });
    }
    try {
        const category = yield categoryService.deleteCategory(id, panelId);
        res.status(200).json({ message: "Category deleted", data: category });
    }
    catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
});
exports.deleteCategoryController = deleteCategoryController;
