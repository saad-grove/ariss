import { Request, Response } from "express";
import Subcategory from "../services/Subcategory";

const subcategoryService = new Subcategory();

export const addSubcategoryController = async (req: Request, res: Response) => {
  const { title, description, image, categoryId, panelUserId } = req.body;
  const data = { title, description, image, categoryId, panelUserId };

  if (!data) {
    return res.status(404).json({ message: "All fields are required" });
  }

  try {
    const subcategory = await subcategoryService.addSubcategory(
      title,
      description,
      image,
      categoryId,
      panelUserId
    );
    res.status(201).json({ message: "Subcategory added", data: subcategory });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllSubcategoryController = async (
  _req: Request,
  res: Response
) => {
  try {
    const subcategory = await subcategoryService.getAllSubcategory();
    res.status(200).json({ total: subcategory.length, data: subcategory });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getSingleSubcategoryController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const subcategory = await subcategoryService.getSingleSubcategory(id);
    res.status(200).json({ data: subcategory });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSubcategoryController = async (
  req: Request,
  res: Response
) => {
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
    const subcategory = await subcategoryService.updateSubcategory(
      id,
      title,
      description,
      image,
      categoryId,
      panelUserId
    );
    res.status(200).json({ message: "Subcategory updated", data: subcategory });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
};

export const deleteSubcategoryController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { panelId } = req.params;

  if (!id || !panelId) {
    return res.status(404).json({ message: "IDs not found" });
  }

  try {
    const subcategory = await subcategoryService.deleteSubcategory(id, panelId);
    res.status(200).json({ message: "Subcategory deleted", data: subcategory });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
