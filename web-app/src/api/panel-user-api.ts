import type { AddPanelUserType } from "@/types/panel-user-types";
import axios from "axios";
import apiUrl from "./api-url";

export const registerPanelUser = async (payload: AddPanelUserType) => {
  return axios.post(`${apiUrl}/panel-user/register`, payload);
};
