import axios from "axios";
import { ApiResponse } from "../interfaces/ApiResponse";
import { ApiManager } from "../ApiManager/ApiManager";
import { Proveedor } from "@/app/dashboard/Tarifas/interfaces/proveedor";

export const getProveedores = async (
  token: string
): Promise<ApiResponse<Proveedor[]>> => {
  try {
    const response = await ApiManager.get("/proveedor", {
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
): Promise<ApiResponse<Proveedor>> => {
  try {
    const response = await ApiManager.get(`/proveedor/proveedores/${id}`, {
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
        result: {} as Proveedor,
        status: error.response?.status ?? 500,
        isSuccess: false,
        displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
        errorMessages: error.response?.data?.errorMessages ?? [error.message],
      };
    }
    return {
      result: {} as Proveedor,
      status: 500,
      isSuccess: false,
      displayMessage: "Unknown error",
      errorMessages: [String(error)],
    };
  }
};

export const getProveedorByUser = async (
  token: string
): Promise<ApiResponse<Proveedor>> => {
  try {
    const response = await ApiManager.get('/proveedor/tarifas', {
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
        result: {} as Proveedor,
        status: error.response?.status ?? 500,
        isSuccess: false,
        displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
        errorMessages: error.response?.data?.errorMessages ?? [error.message],
      };
    }
    return {
      result: {} as Proveedor,
      status: 500,
      isSuccess: false,
      displayMessage: "Unknown error",
      errorMessages: [String(error)],
    };
  }
};
