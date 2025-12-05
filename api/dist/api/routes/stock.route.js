"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_route_1 = __importDefault(require("./category.route"));
const subcategory_route_1 = __importDefault(require("./subcategory.route"));
const product_route_1 = __importDefault(require("./product.route"));
const stockRouter = (0, express_1.Router)();
stockRouter.use("/category", category_route_1.default);
stockRouter.use("/subcategory", subcategory_route_1.default);
stockRouter.use("/product", product_route_1.default);
exports.default = stockRouter;
