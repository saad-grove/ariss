import axios from "axios";
import apiUrl from "./api-url";
import type { AddProductType } from "@/types/product-types";

export const fetchAllProducts = async () => {
  return axios.get(`${apiUrl}/stock/product/all`);
};

export const fetchSingleProduct = async (id: string) => {
  return axios.get(`${apiUrl}/stock/product/${id}`);
};

export const createProduct = async (payload: AddProductType) => {
  return axios.post(`${apiUrl}/stock/product/add`, payload);
};

export const updateProduct = async (id: string, payload: AddProductType) => {
  return axios.put(`${apiUrl}/stock/product/update/${id}`, payload);
};

export const deleteProduct = async (id: string, panelId: string) => {
  return axios.delete(`${apiUrl}/stock/product/delete/${id}/${panelId}`);
};

export const releaseProduct = async (id: string, panelId: string) => {
  return axios.patch(`${apiUrl}/stock/product/release/${id}/${panelId}`);
};

export const unreleaseProduct = async (id: string, panelId: string) => {
  return axios.patch(`${apiUrl}/stock/product/unrelease/${id}/${panelId}`);
};
