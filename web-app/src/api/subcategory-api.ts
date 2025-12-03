import axios from "axios";
import apiUrl from "./api-url";
import type { AddSubcategoryType } from "@/types/subcategory-types";

export const fetchAllSubcategories = async () => {
  return axios.get(`${apiUrl}/stock/subcategory/all`);
};

export const fetchSingleSubcategory = async (id: string) => {
  return axios.get(`${apiUrl}/stock/subcategory/${id}`);
};

export const createSubcategory = async (payload: AddSubcategoryType) => {
  return axios.post(`${apiUrl}/stock/subcategory/add`, payload);
};

export const updateSubcategory = async (
  id: string,
  payload: AddSubcategoryType
) => {
  return axios.put(`${apiUrl}/stock/subcategory/update/${id}`, payload);
};

export const deleteSubcategory = async (id: string, panelId: string) => {
  return axios.delete(`${apiUrl}/stock/subcategory/delete/${id}/${panelId}`);
};
