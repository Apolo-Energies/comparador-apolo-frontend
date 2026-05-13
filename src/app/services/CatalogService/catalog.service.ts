import axios from "axios";
import { ApiManager } from "../ApiManager/ApiManager";
import { ApiResponse } from "../interfaces/ApiResponse";

export interface CatalogItem {
  id: string;
  name: string;
}

export interface Catalog {
  providers: CatalogItem[];
  commissions: CatalogItem[];
}

export const getCatalog = async (token: string): Promise<ApiResponse<Catalog>> => {
  try {
    const response = await ApiManager.get("/catalog", {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: false,
    });

    return {
      result: response.data.result ?? response.data,
      status: response.status,
      isSuccess: true,
      displayMessage: "",
      errorMessages: [],
    };
  } catch (error) {
    console.error("Get catalog error:", error);
    const message = axios.isAxiosError(error)
      ? (error.response?.data?.error ?? error.message)
      : String(error);
    return {
      result: { providers: [], commissions: [] },
      status: axios.isAxiosError(error) ? (error.response?.status ?? 500) : 500,
      isSuccess: false,
      displayMessage: message,
      errorMessages: [message],
    };
  }
};
