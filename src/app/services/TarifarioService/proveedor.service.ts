import axios from "axios";
import { ApiResponse } from "../interfaces/ApiResponse";
import { ApiManager } from "../ApiManager/ApiManager";
import { Provider } from "@/app/dashboard/Settings/Rates/interfaces/proveedor";

export const getProveedores = async (
  token: string
): Promise<ApiResponse<Provider[]>> => {
  try {
    const response = await ApiManager.get("/provider", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: false,
    });

    return {
      result: response.data.result,
      status: response.status,
      isSuccess: true,
      displayMessage: response.data.displayMessage ?? "",
      errorMessages: response.data.errorMessages ?? [],
    };
  } catch (error) {
    console.error("Get historialComparador error:", error);
    if (axios.isAxiosError(error)) {
      return {
        result: [],
        status: error.response?.status ?? 500,
        isSuccess: false,
        displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
        errorMessages: error.response?.data?.errorMessages ?? [error.message],
      };
    }
    return {
      result: [],
      status: 500,
      isSuccess: false,
      displayMessage: "Unknown error",
      errorMessages: [String(error)],
    };
  }
};

export const getProveedorById = async (
  id: number,
  token: string
): Promise<ApiResponse<Provider>> => {
  try {
    const response = await ApiManager.get(`/provider/providers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: false,
    });

    return {
      result: response.data.result,
      status: response.status,
      isSuccess: true,
      displayMessage: response.data.displayMessage ?? "",
      errorMessages: response.data.errorMessages ?? [],
    };
  } catch (error) {
    console.error("Get proveedor by ID error:", error);
    if (axios.isAxiosError(error)) {
      return {
        result: {} as Provider,
        status: error.response?.status ?? 500,
        isSuccess: false,
        displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
        errorMessages: error.response?.data?.errorMessages ?? [error.message],
      };
    }
    return {
      result: {} as Provider,
      status: 500,
      isSuccess: false,
      displayMessage: "Unknown error",
      errorMessages: [String(error)],
    };
  }
};

export const getProveedorByUser = async (
  token: string
): Promise<ApiResponse<Provider>> => {
  try {
    const response = await ApiManager.get('/provider/tariffs', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: false,
    });

    return {
      result: response.data.result,
      status: response.status,
      isSuccess: true,
      displayMessage: response.data.displayMessage ?? "",
      errorMessages: response.data.errorMessages ?? [],
    };
  } catch (error) {
    console.error("Get proveedor by ID error:", error);
    if (axios.isAxiosError(error)) {
      return {
        result: {} as Provider,
        status: error.response?.status ?? 500,
        isSuccess: false,
        displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
        errorMessages: error.response?.data?.errorMessages ?? [error.message],
      };
    }
    return {
      result: {} as Provider,
      status: 500,
      isSuccess: false,
      displayMessage: "Unknown error",
      errorMessages: [String(error)],
    };
  }
};
