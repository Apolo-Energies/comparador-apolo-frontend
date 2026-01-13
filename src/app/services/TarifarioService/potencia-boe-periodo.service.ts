import axios from "axios";
import { ApiResponse } from "../interfaces/ApiResponse";
import { ApiManager } from "../ApiManager/ApiManager";
import { BoePowerPeriod } from "@/app/dashboard/Settings/Rates/interfaces/proveedor";

const baseUrl = "/potenciaboeperiodo";

type PotenciaBoePeriodoCreate = Omit<BoePowerPeriod, "id">;
// Crear
export const createPotenciaBoePeriodo = async (
  token: string,
  payload: PotenciaBoePeriodoCreate
): Promise<ApiResponse<BoePowerPeriod>> => {
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
    console.error("Create PotenciaBoePeriodo error:", error);
    if (axios.isAxiosError(error)) {
      return {
        result: {} as BoePowerPeriod,
        status: error.response?.status ?? 500,
        isSuccess: false,
        displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
        errorMessages: error.response?.data?.errorMessages ?? [error.message],
      };
    }
    return {
      result: {} as BoePowerPeriod,
      status: 500,
      isSuccess: false,
      displayMessage: "Unknown error",
      errorMessages: [String(error)],
    };
  }
};

// Actualizar
export const updatePotenciaBoePeriodo = async (
  token: string,
  id: number,
  payload: BoePowerPeriod
): Promise<ApiResponse<BoePowerPeriod>> => {
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
    console.error("Update PotenciaBoePeriodo error:", error);
    if (axios.isAxiosError(error)) {
      return {
        result: {} as BoePowerPeriod,
        status: error.response?.status ?? 500,
        isSuccess: false,
        displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
        errorMessages: error.response?.data?.errorMessages ?? [error.message],
      };
    }
    return {
      result: {} as BoePowerPeriod,
      status: 500,
      isSuccess: false,
      displayMessage: "Unknown error",
      errorMessages: [String(error)],
    };
  }
};

// Eliminar
export const deletePotenciaBoePeriodo = async (
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
    console.error("Delete PotenciaBoePeriodo error:", error);
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
