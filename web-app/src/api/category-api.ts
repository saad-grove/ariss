import axios from "axios";
import apiUrl from "./api-url";
import type { AddCategoryType } from "@/types/category-types";

export const fetchAllCategories = async () => {
  return axios.get(`${apiUrl}/stock/category/all`);
};

export const fetchSingleCategory = async (id: string) => {
  return axios.get(`${apiUrl}/stock/category/${id}`);
};

export const createCategory = async (payload: AddCategoryType) => {
  return axios.post(`${apiUrl}/stock/category/add`, payload);
};

export const updateCategory = async (id: string, payload: AddCategoryType) => {
  return axios.put(`${apiUrl}/stock/category/update/${id}`, payload);
};

export const deleteCategory = async (id: string, panelId: string) => {
  return axios.delete(`${apiUrl}/stock/category/delete/${id}/${panelId}`);
};
