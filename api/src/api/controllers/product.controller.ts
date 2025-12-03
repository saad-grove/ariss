import { Request, Response } from "express";
import Product from "../services/Product";

const productServices = new Product();

export const addProductController = async (req: Request, res: Response) => {
  const {
    title,
    price,
    quantity,
    description,
    img1,
    img2,
    img3,
    img4,
    subcategoryId,
    panelUserId,
  } = req.body;
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
    const product = await productServices.addProduct(
      title,
      price,
      quantity,
      description,
      img1,
      img2,
      img3,
      img4,
      subcategoryId,
      panelUserId
    );
    res.status(201).json({ message: "Product added", data: product });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};

export const fetchAllProductsController = async (
  _req: Request,
  res: Response
) => {
  try {
    const product = await productServices.fetchAllProducts();
    res.status(200).json({ total: product.length, data: product });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  const { id, panelId } = req.params;

  if (!id || !panelId) {
    return res
      .status(404)
      .json({ message: "Id or Panel Id is missing from params or is invalid" });
  }

  try {
    const product = await productServices.deleteProduct(id, panelId);
    res.status(200).json({ message: "Product deleted", data: product });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
};

export const releaseProductController = async (req: Request, res: Response) => {
  const { id, panelUserId } = req.params;

  if (!id || !panelUserId) {
    res.status(404).json({ message: "Id or Panel Id is invalid" });
  }

  try {
    const product = await productServices.releaseProduct(id, panelUserId);
    res.status(200).json({ message: "Product released", data: product });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
};

export const unreleaseProductController = async (
  req: Request,
  res: Response
) => {
  const { id, panelUserId } = req.params;

  if (!id || !panelUserId) {
    res.status(404).json({ message: "Id or Panel Id is invalid" });
  }

  try {
    const product = await productServices.unreleaseProduct(id, panelUserId);
    res.status(200).json({ message: "Product unreleased", data: product });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
};
