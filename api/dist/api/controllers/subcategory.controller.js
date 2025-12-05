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
exports.deleteSubcategoryController = exports.updateSubcategoryController = exports.getSingleSubcategoryController = exports.getAllSubcategoryController = exports.addSubcategoryController = void 0;
const Subcategory_1 = __importDefault(require("../services/Subcategory"));
const subcategoryService = new Subcategory_1.default();
const addSubcategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, image, categoryId, panelUserId } = req.body;
    const data = { title, description, image, categoryId, panelUserId };
    if (!data) {
        return res.status(404).json({ message: "All fields are required" });
    }
    try {
        const subcategory = yield subcategoryService.addSubcategory(title, description, image, categoryId, panelUserId);
        res.status(201).json({ message: "Subcategory added", data: subcategory });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.addSubcategoryController = addSubcategoryController;
const getAllSubcategoryController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subcategory = yield subcategoryService.getAllSubcategory();
        res.status(200).json({ total: subcategory.length, data: subcategory });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.getAllSubcategoryController = getAllSubcategoryController;
const getSingleSubcategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const subcategory = yield subcategoryService.getSingleSubcategory(id);
        res.status(200).json({ data: subcategory });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.getSingleSubcategoryController = getSingleSubcategoryController;
const updateSubcategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(404).json({ message: "ID not found" });
    }
    const { title, description, image, categoryId, panelUserId } = req.body;
    const data = { title, description, image, categoryId, panelUserId };
    if (!data) {
        return res.status(404).json({ message: "All fields are required" });
    }
    try {
        const subcategory = yield subcategoryService.updateSubcategory(id, title, description, image, categoryId, panelUserId);
        res.status(200).json({ message: "Subcategory updated", data: subcategory });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error.message);
    }
});
exports.updateSubcategoryController = updateSubcategoryController;
const deleteSubcategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { panelId } = req.params;
    if (!id || !panelId) {
        return res.status(404).json({ message: "IDs not found" });
    }
    try {
        const subcategory = yield subcategoryService.deleteSubcategory(id, panelId);
        res.status(200).json({ message: "Subcategory deleted", data: subcategory });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.deleteSubcategoryController = deleteSubcategoryController;
