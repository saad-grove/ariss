import { Request, Response } from "express";
import Category from "../services/Category";

const categoryService = new Category();

export const addCategoryController = async (req: Request, res: Response) => {
  const { title, description, image, panelUserId } = req.body;
  const data = { title, description, image, panelUserId };

  if (!data) {
    return res.status(404).json({ message: "All fields are required" });
  }

  try {
    const category = await categoryService.addCategory(
      title,
      description,
      image,
      panelUserId
    );
    res.status(201).json({ message: "Category added", data: category });
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const getAllCategoryController = async (
  _req: Request,
  res: Response
) => {
  try {
    const category = await categoryService.getAllCategory();
    res.status(200).json({ total: category.length, data: category });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getSingleCategoryController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const category = await categoryService.getSingleCategory(id);
    res.status(200).json({ data: category });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCategoryController = async (req: Request, res: Response) => {
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
    const category = await categoryService.updateCategory(
      id,
      title,
      description,
      image,
      panelUserId
    );
    res.status(200).json({ message: "Category updated", data: category });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCategoryController = async (req: Request, res: Response) => {
  const { id, panelId } = req.params;

  if (!id || !panelId) {
    return res.status(404).json({ message: "IDs not found" });
  }

  try {
    const category = await categoryService.deleteCategory(id, panelId);
    res.status(200).json({ message: "Category deleted", data: category });
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
