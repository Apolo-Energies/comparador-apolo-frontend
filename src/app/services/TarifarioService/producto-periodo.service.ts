import axios from "axios";
import { ApiResponse } from "../interfaces/ApiResponse";
import { ApiManager } from "../ApiManager/ApiManager";
import { ProductoPeriodo } from "@/app/dashboard/Tarifas/interfaces/proveedor";

const baseUrl = "/productoperiodo";

type ProductoPeriodoCreate = Omit<ProductoPeriodo, "id">;
// Crear
export const createProductoPeriodo = async (
  token: string,
  payload: ProductoPeriodoCreate
): Promise<ApiResponse<ProductoPeriodo>> => {
  try {
    const response = await ApiManager.post(baseUrl, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      result: response.data.result,
      status: response.status,
      isSuccess: true,
      displayMessage: response.data.displayMessage ?? "",
      errorMessages: response.data.errorMessages ?? [],
    };
  } catch (error) {
    console.error("Create ProductoPeriodo error:", error);
    if (axios.isAxiosError(error)) {
      return {
        result: {} as ProductoPeriodo,
        status: error.response?.status ?? 500,
        isSuccess: false,
        displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
        errorMessages: error.response?.data?.errorMessages ?? [error.message],
      };
    }
    return {
      result: {} as ProductoPeriodo,
      status: 500,
      isSuccess: false,
      displayMessage: "Unknown error",
      errorMessages: [String(error)],
    };
  }
};

// Actualizar
export const updateProductoPeriodo = async (
  token: string,
  id: number,
  payload: ProductoPeriodo
): Promise<ApiResponse<ProductoPeriodo>> => {
  try {
    const response = await ApiManager.put(`${baseUrl}/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      result: response.data.result,
      status: response.status,
      isSuccess: true,
      displayMessage: response.data.displayMessage ?? "",
      errorMessages: response.data.errorMessages ?? [],
    };
  } catch (error) {
    console.error("Update ProductoPeriodo error:", error);
    if (axios.isAxiosError(error)) {
      return {
        result: {} as ProductoPeriodo,
        status: error.response?.status ?? 500,
        isSuccess: false,
        displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
        errorMessages: error.response?.data?.errorMessages ?? [error.message],
      };
    }
    return {
      result: {} as ProductoPeriodo,
      status: 500,
      isSuccess: false,
      displayMessage: "Unknown error",
      errorMessages: [String(error)],
    };
  }
};

// Eliminar
export const deleteProductoPeriodo = async (
  token: string,
  id: number
): Promise<ApiResponse<boolean>> => {
  try {
    const response = await ApiManager.delete(`${baseUrl}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      result: response.data.result,
      status: response.status,
      isSuccess: true,
      displayMessage: response.data.displayMessage ?? "",
      errorMessages: response.data.errorMessages ?? [],
    };
  } catch (error) {
    console.error("Delete ProductoPeriodo error:", error);
    if (axios.isAxiosError(error)) {
      return {
        result: false,
        status: error.response?.status ?? 500,
        isSuccess: false,
        displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
        errorMessages: error.response?.data?.errorMessages ?? [error.message],
      };
    }
    return {
      result: false,
      status: 500,
      isSuccess: false,
      displayMessage: "Unknown error",
      errorMessages: [String(error)],
    };
  }
};
