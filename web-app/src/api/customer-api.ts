import axios from "axios";
import apiUrl from "./api-url";

export const fetchAllApprovedOwners = async () => {
  return axios.get(`${apiUrl}/customer/owner/all-approved`);
};

export const fetchAllNonApprovedOwners = async () => {
  return axios.get(`${apiUrl}/customer/owner/all-nonapproved`);
};

export const approveOwner = async (email: string) => {
  return axios.patch(`${apiUrl}/customer/owner/approve/${email}`);
};

export const disapproveOwner = async (email: string) => {
  return axios.patch(`${apiUrl}/customer/owner/disapprove/${email}`);
};

export const removeCustomer = async (email: string) => {
  return axios.delete(`${apiUrl}/customer/remove/${email}`);
};
