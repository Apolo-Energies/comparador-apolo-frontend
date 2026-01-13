import axios from "axios";
import { ApiResponse } from "../interfaces/ApiResponse";
import { ApiManager } from "../ApiManager/ApiManager";
import { OmieDistributionPeriod } from "@/app/dashboard/Settings/Rates/interfaces/proveedor";

const baseUrl = "/repartoperiodoomie";

type RepartoOmiePeriodoCreate = Omit<OmieDistributionPeriod, "id">;
// Crear
export const createRepartoOmiePeriodo = async (
  token: string,
  payload: RepartoOmiePeriodoCreate
): Promise<ApiResponse<OmieDistributionPeriod>> => {
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
    console.error("Create RepartoOmiePeriodo error:", error);
    if (axios.isAxiosError(error)) {
      return {
        result: {} as OmieDistributionPeriod,
        status: error.response?.status ?? 500,
        isSuccess: false,
        displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
        errorMessages: error.response?.data?.errorMessages ?? [error.message],
      };
    }
    return {
      result: {} as OmieDistributionPeriod,
      status: 500,
      isSuccess: false,
      displayMessage: "Unknown error",
      errorMessages: [String(error)],
    };
  }
};

// Actualizar
export const updateRepartoOmiePeriodo = async (
  token: string,
  id: number,
  payload: OmieDistributionPeriod
): Promise<ApiResponse<OmieDistributionPeriod>> => {
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
    console.error("Update RepartoOmiePeriodo error:", error);
    if (axios.isAxiosError(error)) {
      return {
        result: {} as OmieDistributionPeriod,
        status: error.response?.status ?? 500,
        isSuccess: false,
        displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
        errorMessages: error.response?.data?.errorMessages ?? [error.message],
      };
    }
    return {
      result: {} as OmieDistributionPeriod,
      status: 500,
      isSuccess: false,
      displayMessage: "Unknown error",
      errorMessages: [String(error)],
    };
  }
};

// Eliminar
export const deleteRepartoOmiePeriodo = async (
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
    console.error("Delete RepartoOmiePeriodo error:", error);
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
